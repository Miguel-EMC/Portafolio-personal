import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NavComponent, RouterModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  email: string = " eduardomuzo123456@gmail.com";

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
