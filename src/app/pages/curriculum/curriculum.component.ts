import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent implements OnInit{

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
