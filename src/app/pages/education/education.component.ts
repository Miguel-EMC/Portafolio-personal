import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {NavComponent} from "../../components/nav/nav.component";
import {AboutMeComponent} from "../about-me/about-me.component";
import {SkillsComponent} from "../skills/skills.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [NavComponent, FooterComponent, RouterModule, AboutMeComponent, SkillsComponent],
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
