
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


/**
 * This function hides a sticky element when user
 * scrolls down and brings the element back to view
 * when user scrolls back up.
 */
export class ShowOnScrollUp {
    private active = false;

    private previousScrollY: number; // How many px previously scrolled to
    private scrollDifference: number; // Difference between prev and current scroll
    private currentTop: number; // Current top position of element

    constructor(
        private element, private top: number, private height: number
    ) {}

    private processScroll = () => {
        this.scrollDifference = window.scrollY - this.previousScrollY;
        this.previousScrollY = window.scrollY;

        // If scroll is below the top position (css property)
        if (window.scrollY > this.top) {
            this.currentTop = this.element.getBoundingClientRect().top;
            // If scrolled down
            if (this.scrollDifference > 0) {
                // If element is still on screen
                if (this.currentTop > -this.height) {
                    this.element.style.top = `${this.currentTop - this.scrollDifference}px`;

                    // If element overshot it's above spot
                    if (this.element.getBoundingClientRect().top < -this.height) {
                        this.element.style.top = `${-this.height}px`;
                    }
                }

            // If scrolled up
            } else if (this.scrollDifference < 0) {
                // If element is not at it's original top spot
                if (this.currentTop < this.top) {
                    this.element.style.top = `${this.currentTop - this.scrollDifference}px`;

                    // If element is below it's original top spot
                    if (this.element.getBoundingClientRect().top > this.top) {
                        this.element.style.top = `${this.top}px`;
                    }
                }
            }
        }
    }

    activate() {
        this.active = true;
        this.previousScrollY = window.scrollY;
        window.addEventListener('scroll', this.processScroll);
    }

    deactivate() {
        this.active = false;
        window.removeEventListener('scroll', this.processScroll);
    }

    isActive() {
        return this.active;
    }
}
