import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  // private homeUrl = 'https://localhost:44360';
  private homeUrl = 'http://eugene-metlitski.com';

  post(vals: JSON, cb: Function) {
    const url = `${this.homeUrl}/api/messages`;
    this.http.post(url, vals).subscribe(res => { cb(res); });
  }
}
