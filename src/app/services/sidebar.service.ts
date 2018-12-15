import { Injectable } from '@angular/core';

export enum State {
  InsideDocumentFlow = 0,
  OutsideDocumentFlow = 1
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private callbackMap = {};


  constructor() { }

  getContent() {
    return 'hello world';
  }

  subToStateChange(state: State, callback: Function) {
    this.callbackMap[state] = callback;
  }

  setState(state: State) {
    if (this.callbackMap[state]) {
      this.callbackMap[state]();
    }
  }
}
