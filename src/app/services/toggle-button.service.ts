import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleButtonService {
  /**
   * This class is for letting the whole
   * application know when wether the
   * sidebar is in visible state or not.
   */

  private _visible = true;
  private functions: Function[] = [];

  // Getter & setter for visibility state
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(arg: boolean) {
    this.changeState(arg);
  }

  // Subscribe function to be called on state change
  public subscribe = (callback: Function) => {
    this.functions.push(callback);
  }

  // Toggle the visibility state
  public toggle() {
    this.changeState(!this._visible);
  }

  // What happens when state changes
  private changeState(state: boolean) {
    this._visible = state;

    // Call each function that was subscribed
    this.functions.forEach((f) => {
      f();
    });
  }
}
