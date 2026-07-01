import { Component, OnInit, OnDestroy, inject, signal, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { BlogService } from '../../../core/services/blog.service';
import { SeoService } from '../../../core/services/seo.service';
import { BlogPost, BlogPostMeta, BLOG_CATEGORIES } from '../../../interfaces/blog.interface';

interface TocItem {
  id: string;
  text: string;
  level: number;
  active: boolean;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  post = signal<BlogPost | null>(null);
  relatedPosts = signal<BlogPostMeta[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);
  imageError = signal(false);
  relatedImageErrors = signal<{ [slug: string]: boolean }>({});
  readingProgress = signal(0);
  toc = signal<TocItem[]>([]);

  onImageError(): void {
    this.imageError.set(true);
  }

  onRelatedImageError(slug: string): void {
    this.relatedImageErrors.update(errors => ({ ...errors, [slug]: true }));
  }

  ngOnInit(): void {
    // Listen to window scroll event for reading progress bar
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const slug = params.get('slug');
        if (!slug) {
          this.error.set('Post not found');
          this.isLoading.set(false);
          return [];
        }
        this.isLoading.set(true);
        // Reset image error, reading states, and TOC when routing between posts
        this.imageError.set(false);
        this.relatedImageErrors.set({});
        this.readingProgress.set(0);
        this.toc.set([]);
        
        if (this.observer) {
          this.observer.disconnect();
        }

        return this.blogService.getPostBySlug(slug);
      })
    ).subscribe({
      next: (post) => {
        if (post) {
          this.post.set(post);
          this.updateSeo(post);
          this.loadRelatedPosts(post.slug);
          this.addCopyButtons();
          this.buildToc();
        } else {
          this.error.set('Post not found');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load post:', err);
        this.error.set('Failed to load post');
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Clean up scroll listener
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }

    // Clean up intersection observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private onScroll = (): void => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (totalHeight > 0) {
      const percentage = (window.scrollY / totalHeight) * 100;
      this.readingProgress.set(percentage);
    } else {
      this.readingProgress.set(0);
    }
  };

  private loadRelatedPosts(currentSlug: string): void {
    this.blogService.getRelatedPosts(currentSlug, 3).pipe(
      takeUntil(this.destroy$)
    ).subscribe(posts => this.relatedPosts.set(posts));
  }

  private updateSeo(post: BlogPost): void {
    this.seoService.updateForBlogPost({
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      author: post.author,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      category: post.category,
      tags: post.tags,
      slug: post.slug
    });
  }

  getCategoryInfo(categoryId: string) {
    return BLOG_CATEGORIES.find(c => c.id === categoryId);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  shareOnTwitter(): void {
    const post = this.post();
    if (!post) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  }

  shareOnLinkedIn(): void {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  goBack(): void {
    this.router.navigate(['/blog']);
  }

  scrollToHeading(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private buildToc(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Wait slightly to make sure the markdown innerHTML is fully rendered in the DOM
    setTimeout(() => {
      const postContentEl = document.querySelector('.post-content');
      if (!postContentEl) return;

      const headings = postContentEl.querySelectorAll('h2, h3');
      const tocItems: TocItem[] = [];

      headings.forEach((heading, index) => {
        let id = heading.getAttribute('id');
        if (!id) {
          // Generate a safe unique ID based on the text contents
          const slug = heading.textContent
            ?.trim()
            .toLowerCase()
            .normalize('NFD') // remove accents
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''); // remove leading/trailing dashes
          
          id = `toc-${index}-${slug}`;
          heading.setAttribute('id', id);
        }

        tocItems.push({
          id: id,
          text: heading.textContent?.trim() || '',
          level: heading.tagName.toLowerCase() === 'h2' ? 2 : 3,
          active: false
        });
      });

      this.toc.set(tocItems);
      this.setupIntersectionObserver();
    }, 400);
  }

  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    const headingElements: Element[] = [];
    this.toc().forEach(item => {
      const el = document.getElementById(item.id);
      if (el) headingElements.push(el);
    });

    if (headingElements.length === 0) return;

    const options = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      // Find the first intersecting entry
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      if (intersectingEntry) {
        const id = intersectingEntry.target.getAttribute('id');
        if (id) {
          this.toc.update(items =>
            items.map(item => ({
              ...item,
              active: item.id === id
            }))
          );
        }
      }
    }, options);

    headingElements.forEach(el => this.observer?.observe(el));
  }

  private addCopyButtons(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Wait for the next tick to ensure the DOM is updated via innerHTML
    setTimeout(() => {
      const postContentEl = document.querySelector('.post-content');
      if (!postContentEl) return;
      
      const preElements = postContentEl.querySelectorAll('pre');
      preElements.forEach((pre) => {
        // Prevent duplicate copy buttons
        if (pre.querySelector('.copy-code-btn')) return;
        
        // Relative position container for absolute position of copy button
        pre.style.position = 'relative';
        
        // Create button
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.type = 'button';
        button.setAttribute('aria-label', 'Copy code');
        button.innerHTML = '<i class="bi bi-clipboard"></i><span>Copy</span>';
        
        // Retrieve code content to copy
        const codeEl = pre.querySelector('code');
        const codeText = codeEl ? codeEl.innerText : '';
        
        // Add click listener
        button.addEventListener('click', () => {
          navigator.clipboard.writeText(codeText).then(() => {
            button.innerHTML = '<i class="bi bi-check2"></i><span>Copied!</span>';
            button.classList.add('copied');
            
            setTimeout(() => {
              button.innerHTML = '<i class="bi bi-clipboard"></i><span>Copy</span>';
              button.classList.remove('copied');
            }, 2000);
          }).catch(err => {
            console.error('Could not copy code text: ', err);
          });
        });
        
        pre.appendChild(button);
      });
    }, 200);
  }
}
