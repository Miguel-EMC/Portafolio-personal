import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { EducationComponent } from './pages/education/education.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'about-me', component: AboutMeComponent},
    {path:'skills', component: SkillsComponent},
    {path:'curriculum', component: CurriculumComponent},
    {path:'portfolio', component: PortafolioComponent},
    {path:'contacts', component: ContactsComponent},
    {path:'education', component: EducationComponent },
];
