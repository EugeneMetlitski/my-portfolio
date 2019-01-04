import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * This class uses Angular animations to transition an element between
 * 2 different styles. The duration of the transition can be toggled
 * on and off (0s or specified time).
 *
 * To use this class, instantiate it before the component class declaration.
 * Add the trigger from this class to component decorator. Don't forget to
 * create a variable inside the component class and set it equal to the
 * instance instantiated before the component class so that the element
 * will be able to access the state for the animation. Add the name
 * of the trigger to an element that will use it. Set the state of the
 * element to the state provided by this class.
 *
 * Here is an example of how to set the element: <div [@triggerName]=
 * "instance.state"></div>. Change the state by calling toggleState()
 * method.
 */
export class CustomTransition {
    private quick = false; // Should animation be 0 seconds?
    private duration = '1s';
    private ease = 'ease-in-out';

    private s1 = 'state1';
    private s2 = 'state2';
    private q1 = 'state1_quick';
    private q2 = 'state2_quick';
    private _state = this.s1;

    constructor(
        private triggerName: string,
        private style1: {},
        private style2: {},
        quick?: boolean,
        duration?: string,
        ease?: string,
    ) {
        if (quick) { this.quick = quick; }
        if (duration) { this.duration = duration; }
        if (ease) { this.ease = ease; }
    }

    get state() { return this._state; }

    getTrigger() {
        return trigger(this.triggerName, [
            state(this.s1, style(this.style1)),
            state(this.s2, style(this.style2)),
            state(this.q1, style(this.style1)),
            state(this.q2, style(this.style2)),
            transition(this.s1 + ' <=> ' + this.s2, animate(this.duration + ' ' + this.ease)),
            transition(this.q1 +  ' => ' + this.s2, animate(this.duration + ' ' + this.ease)),
            transition(this.q2 +  ' => ' + this.s1, animate(this.duration + ' ' + this.ease)),
            transition(this.q1 + ' <=> ' + this.q2, animate('0s')),
            transition(this.s1 +  ' => ' + this.q2, animate('0s')),
            transition(this.s2 +  ' => ' + this.q1, animate('0s')),
        ]);
    }

    toggleDuration() {
        this.quick = !this.quick;
    }

    toggleState() {
        this._state = (this._state === this.s1 || this._state === this.q1) ?
            (this.quick) ? this.q2 : this.s2 :
            (this.quick) ? this.q1 : this.s1;
    }
}



// SCROLL ANIMATIONS //

/**
 * This function scrolls to specified y
 * scroll position using quadratic inOut
 * animation for the specified duration.
 *
 * @param scrollY where to scroll to (in pixels)
 * @param duration how long should it take (in milliseconds)
 */
export function smoothScrollTo(scrollY, duration) {

    // console.log('hello');
    const startScrollY = window.scrollY;
    const distance = scrollY - startScrollY;
    let startTime = null;

    function myAnimation(currentTime) {
        // Variables
        if (startTime === null) { startTime = currentTime; }
        const timeElapsed = currentTime - startTime;
        const currentScrollY = easeInOutQuad(timeElapsed, startScrollY, distance, duration);

        window.scrollTo(0, currentScrollY);
        if (timeElapsed < duration) { requestAnimationFrame(myAnimation); }

        // Function from http://www.gizma.com/easing/
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) { return c / 2 * t * t + b; }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    }

    requestAnimationFrame(myAnimation);
}

// Need this variable to be able to disable scroll event later
let processScroll;
function hideOnScroll(element, top, height, deactivate) {
    /** This function hides a sticky element
        when user scrolls down and brings the
        element back to view when user scrolls
        back up.
        Top: sticky element's top css property.
        Height: element's height.
    */

    if (deactivate) {
        // Remove scroll event handler
        window.removeEventListener('scroll', processScroll);
        console.log('deactivate');
        return; // Step out of hideOnScroll() function
    }

    // Declare variables here so that they won't have
    // to be re-declared many times per second later.
    let scrollY = 0; // How many px window is currently scrolled down to
    let previousScrollY = window.scrollY; // How many px previously scrolled to
    let scrollDifference = 0; // Difference between prev and current scroll
    let currentTop = 0; // Current top position of element

    processScroll = function() {
        scrollY = window.scrollY;
        scrollDifference = scrollY - previousScrollY;
        previousScrollY = scrollY;

        // If scroll is below the top position (css property)
        if (scrollY > top) {
            currentTop = element.getBoundingClientRect().top;

            // If scrolled down
            if (scrollDifference > 0) {
                // If element is still on screen
                if (currentTop > -height) {
                    element.style.top = `${currentTop - scrollDifference}px`;

                    // If element overshot it's above spot
                    if (element.getBoundingClientRect().top < -height) {
                        console.log(-height);
                        element.style.top = `${-height}px`;
                    }
                }

            // If scrolled up
            } else if (scrollDifference < 0) {
                // If element is not at it's original top spot
                if (currentTop < top) {
                    element.style.top = `${currentTop - scrollDifference}px`;

                    // If element is below it's original top spot
                    if (element.getBoundingClientRect().top > top) {
                        element.style.top = `${top}px`;
                    }
                }
            }
        }
    };

    // Add scroll event listener to window
    window.addEventListener('scroll', processScroll);
}
