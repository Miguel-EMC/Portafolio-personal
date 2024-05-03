import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {

  secction:string = 'education';

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  };
}
