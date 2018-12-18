import { Injectable } from '@angular/core';

/**
   * This class is for letting the whole
   * application know when wether the
   * sidebar is in visible state or not.
   */
@Injectable({
  providedIn: 'root'
})
export class State {

  private _visible = false;
  private renderWidth = false;
  private functions: Function[] = [];

  // Getter & setter for visibility state
  public get visible(): boolean {
    return this._visible;
  }

  public setVisible(arg: boolean, renderWidth: boolean) {
    (renderWidth) ? this.renderWidth = true : this.renderWidth = false;
    this.changeVisible(arg);
  }

  // Subscribe function to be called on state change
  public subscribe = (callback: Function) => {
    this.functions.push(callback);
  }

  // Toggle the visibility state
  public toggleVisible() {
    this.changeVisible(!this._visible);
  }

  // What happens when visible state changes
  private changeVisible(state: boolean) {
    this._visible = state;

    // Call each function that was subscribed
    this.functions.forEach((f) => {
      f(this.renderWidth);
    });
  }
}
