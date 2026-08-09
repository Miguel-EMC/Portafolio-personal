import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
    emailjs.init({
      publicKey: environment.emailJsPublicKey,
    });
  }

  async sendContactForm(formData: ContactFormData): Promise<boolean> {
    try {
      const response = await emailjs.send(
        environment.emailJsServiceId,
        environment.emailJsTemplateId,
        formData,
        {
          publicKey: environment.emailJsPublicKey,
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}