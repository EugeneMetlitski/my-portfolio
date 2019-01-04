import { StyleValue } from './custom-transition';

// Function from http://www.gizma.com/easing/
export function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) { return c / 2 * t * t + b; }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}


export interface StyleValue {
    start: number;
    end: number;
}

export class CustomTransition {
    //#region vars

    private values: StyleValue[];
    private currentValues: number[];
    private callback: Function;
    private ease: Function;
    private duration: number;

    private timeElapsed = 0;
    private jsAnimate = new CustomAnimationLoop((dt: number) => {
        this.timeElapsed += dt;

        // Check if animation should stop
        if (this.timeElapsed > this.duration) {
            this.jsAnimate.stopAnimation();
        }
        // Set current value for each style
        for (let i = 0; i < this.values.length; i++) {
            this.currentValues[i] = this.ease(
                this.timeElapsed,
                this.values[i].start,
                this.values[i].end - this.values[i].start,
                this.duration
            );
        }
        // Call the user's callback function
        this.callback(this.currentValues, dt);
    });

    //#endregion
    //#region init

    constructor(duration?: number, ease?: Function) {
        this.duration = (duration) ? duration : 1000;
        this.ease = (ease) ? ease : easeInOutQuad;
    }

    //#endregion
    //#region public functions

    run(values: StyleValue[], callback: Function) {
        this.values = values;
        this.currentValues = [];
        this.values.forEach(val => { this.currentValues.push(0); });
        this.callback = callback;
        this.timeElapsed = 0;
        this.jsAnimate.runAnimation();
    }

    setStyleValues(values: StyleValue[]) {
        this.values = values;
    }

    //#endregion
}

export class CustomAnimationLoop {
    private run = false;

    constructor(private callback: Function) {}

    runAnimation() {
        this.run = true;
        this.runLoop();
    }

    stopAnimation() {
        this.run = false;
    }

    toggleAnimation() {
        this.run = !this.run;
        if (this.run) { this.runLoop(); }
    }

    private runLoop() {
        let dt: number;
        let timePrev;

        const anim = (timeElapsed) => {
            if (!timePrev) { timePrev = timeElapsed; }
            dt = timeElapsed - timePrev;
            timePrev = timeElapsed;

            this.callback(dt);
            if (this.run) { requestAnimationFrame(anim); }
        };

        requestAnimationFrame(anim);
    }
}
