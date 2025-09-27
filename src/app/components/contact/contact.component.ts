import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  sent = false;
  error = false;

  constructor(private functions: Functions) {}

  async onSubmit(form: NgForm) {
    if (!form.valid) return;

    const { name, email, message } = form.value;
    const sendContactEmail = httpsCallable(this.functions, 'sendContactEmail');

    try {
      await sendContactEmail({ name, email, message });
      this.sent = true;
      this.error = false;
      form.resetForm(); // clear the form after success
    } catch (err) {
      console.error('Error sending contact form:', err);
      this.error = true;
      this.sent = false;
    }
  }
}


