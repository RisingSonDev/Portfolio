import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  mailtoLink: string = 'mailto:risingsondev@gmail.com';

  prepareMailto(form: NgForm) {
    if (!form.valid) return;

    const { name, message } = form.value;

    const subject = encodeURIComponent(`New Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: $\n${message}`
    );

    this.mailtoLink = `mailto:risingsondev@gmail.com?subject=${subject}&body=${body}`;
  }
}
