import { Component, Input } from '@angular/core';
import { NavComponent } from '../../component/nav/nav.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { CardSkillsComponent } from '../../component/card-skills/card-skills.component';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [NavComponent, FooterComponent, CardSkillsComponent],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {


  detailsGit = {
    porcentaje: '60',
    enlace: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png'
  };
  detailsJira = {
    porcentaje: '85',
    enlace:'https://cdn-icons-png.flaticon.com/512/5968/5968875.png'
  };
  detailsFigma = {
    porcentaje: '55',
    enlace:'https://cdn-icons-png.flaticon.com/512/5968/5968705.png'
  };
  detailsPowerBi = {
    porcentaje: '75',
    enlace:'https://d3v6byorcue2se.cloudfront.net/wp-content/uploads/2018/06/logomicrosoftpowerbi.png'
  };
  detailsDocker = {
    porcentaje: '45',
    enlace:'https://static-00.iconduck.com/assets.00/docker-icon-512x438-ga1hb37h.png'
  };
  detailsFirebase = {
    porcentaje: '55',
    enlace:'https://cdn.icon-icons.com/icons2/2699/PNG/512/firebase_logo_icon_171157.png'
  };
  detailsMongo = {
    porcentaje: '60',
    enlace:'https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png'
  };
  detailsPostgresql = {
    porcentaje: '75',
    enlace:'https://cdn.icon-icons.com/icons2/2415/PNG/512/postgresql_plain_wordmark_logo_icon_146390.png'
  };
  detailsMysql = {
    porcentaje: '75',
    enlace:'https://www.svgrepo.com/show/303251/mysql-logo.svg'
  };
  detailsSql = {
    porcentaje: '75',
    enlace:'https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg'
  };
  detailsReact = {
    porcentaje: '35',
    enlace:'https://cdn-icons-png.flaticon.com/512/1126/1126012.png'
  };
  detailsAngular = {
    porcentaje: '30',
    enlace:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png'
  };
  detailsNode = {
    porcentaje: '40',
    enlace:'https://cdn.iconscout.com/icon/free/png-256/free-node-js-1174925.png?f=webp'
  };
  detailsLaravel = {
    porcentaje: '50',
    enlace:'https://static-00.iconduck.com/assets.00/laravel-icon-497x512-uwybstke.png'
  };
  detailsDjango = {
    porcentaje: '35',
    enlace:'https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_django_icon_130645.png'
  };
  detailsC = {
    porcentaje: '20',
    enlace:'https://cdn-icons-png.flaticon.com/512/6132/6132222.png'
  };
  detailsJava = {
    porcentaje: '40',
    enlace:'https://cdn-icons-png.flaticon.com/512/226/226777.png'
  };
  detailsCsharp = {
    porcentaje: '20',
    enlace:'https://cdn-icons-png.flaticon.com/512/6132/6132221.png'
  };
  detailsPhp = {
    porcentaje: '40',
    enlace:'https://cdn-icons-png.flaticon.com/512/5968/5968332.png'
  };
  detailsTypeScript = {
    porcentaje: '30',
    enlace:'https://cdn-icons-png.flaticon.com/512/5968/5968381.png'
  };
  detailsJavaScript = {
    porcentaje: '30',
    enlace:'https://cdn-icons-png.flaticon.com/512/5968/5968292.png'
  };
  detailsPython = {
    porcentaje: '30',
    enlace:'https://cdn-icons-png.flaticon.com/512/5968/5968350.png'
  };
}
