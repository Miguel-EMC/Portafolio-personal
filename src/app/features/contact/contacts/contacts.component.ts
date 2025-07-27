import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NgIf, FormsModule, TranslateModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  email: string = 'eduardomuzo123456@gmail.com';
  isSubmitting: boolean = false;

  onSubmit() {
    this.isSubmitting = true;
    
    // Simular envío del formulario
    setTimeout(() => {
      this.isSubmitting = false;
      // Aquí podrías agregar lógica adicional como mostrar un mensaje de éxito
    }, 2000);
  }
}