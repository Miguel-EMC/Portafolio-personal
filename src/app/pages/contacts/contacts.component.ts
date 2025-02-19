import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  email: string = 'eduardomuzo123456@gmail.com'
}
