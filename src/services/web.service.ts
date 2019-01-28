import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor() { }

  submitEnquiry(vals: JSON, cb: Function) {
    console.log(vals);
    setTimeout(() => {
      cb(true);
    }, 3000);
  }
}
