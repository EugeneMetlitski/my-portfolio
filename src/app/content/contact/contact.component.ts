import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebService } from 'src/services/web.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  btnSubmit = 'Send';
  btnSubmitDisabled = false;
  msgSentSuccess = false;
  msgSentError = false;

  constructor(private webService: WebService) {}

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
      Validators.email
    ]),
    msg: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ])
  });

  submit() {
    this.btnSubmitDisabled = true;
    this.btnSubmit = 'Sending...';

    this.webService.post(this.form.value, (success) => {

      if (success === true) {
        this.msgSentSuccess = true;

        setTimeout(() => {
          this.msgSentSuccess = false;
        }, 3000);

      } else {
        this.msgSentError = true;

        setTimeout(() => {
          this.msgSentError = false;
        }, 3000);
      }

      this.btnSubmitDisabled = false;
      this.btnSubmit = 'Send';
      this.form.reset();
    });
  }
}
