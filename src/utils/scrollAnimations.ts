
/**
 * This function hides a sticky element when user
 * scrolls down and brings the element back to view
 * when user scrolls back up.
 */
export class ShowOnScrollUp {
    private active = true;

    private scrollY: number; // How many px window is currently scrolled down to
    private previousScrollY: number; // How many px previously scrolled to
    private scrollDifference: number; // Difference between prev and current scroll
    private currentTop: number; // Current top position of element

    constructor(
        private element, private top: number, private height: number
    ) {}

    processScroll = () => {
        this.scrollY = window.scrollY;
        this.scrollDifference = this.scrollY - this.previousScrollY;
        this.previousScrollY = this.scrollY;

        // If scroll is below the top position (css property)
        if (this.scrollY > this.top) {
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
        this.previousScrollY = this.scrollY;
        window.addEventListener('scroll', this.processScroll);
    }

    deactivate() {
        this.active = false;
        window.removeEventListener('scroll', this.processScroll);
    }

}
