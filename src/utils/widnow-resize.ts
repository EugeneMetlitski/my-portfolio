
/**
 *  This class provides easy api for handling different screen
 *  sized with typescript. The constructor requires a list of
 *  screen size points at which different functions can be called.
 *  These functions can be modified by user or can be undefined (
 *  in this case no code is executed on screen resize at this point).
 *  An appropriate function will also run at the start of the
 *  application. Screen resize points cannot be added or deleted
 *  after instantiation.
 */
export class WindowResize {

  private mediaQueries = [];
  private callbacks = [];


  constructor(private resizeAt: number[]) {
    this.resizeAt.sort();
    this.createCallbacks();
    this.createMediaQueriesList();
    this.addMediaListeners();
  }

  /**
   * Assign a function that will run at particular screen resize point.
   * This function will also run at the window start.
   *
   * @param resizeAt Point at which media query is called
   * @param smallerThan Is the function called at smaller than resizeAt point?
   * @param callback The function to be assigned at this screen size
   */
  assignFunction = (resizeAt: number, smallerThan: boolean, callback: Function) => {

    // Loop through media queries
    let found = false;
    for (let i = 0; i < this.mediaQueries.length; i++) {

      // If mediaQuery's resizeAt point === point provided as parameter of function
      if (this.mediaQueries[i].resizeAt === resizeAt) {
        found = true;
        const cb = this.findCallback(resizeAt);

        // If this function is for the smallest screen size
        if (i === 0 && smallerThan) {
          cb.f1 = callback; // Set callback on screen resize
          cb.is_f1_set = true; // Indicate this function has been set

        // If this function is for the largest screen size
        } else if (i === (this.mediaQueries.length - 1) && !smallerThan) {
          cb.f2 = callback; // Set callback on screen resize
          cb.is_f2_set = true; // Indicate this function has been set

        } else {
          // If callback is intended for screens smaller then point provided
          if (smallerThan) {
            cb.f1 = callback;
            cb.is_f1_set = true;
            // Find callback for previous resizeAt point
            const cb_smaller = this.findCallback(resizeAt, true, false);
            // Also set cb on screen change from lower to higher for previous point
            cb_smaller.f2 = callback;
            cb_smaller.is_f2_set = true;

          } else {
            cb.f2 = callback;
            cb.is_f2_set = true;

            // Find callback for previous resizeAt point
            const cb_larger = this.findCallback(resizeAt, true, true);
            // Also set cb on screen change from higher to lower for next point
            cb_larger.f1 = callback;
            cb_larger.is_f1_set = true;
          }
        }

        break;
      }
    }

    // If matching resizeAt point is not found, throw error
    if (!found) {
      throw new Error('Resize point for media query provided is incorrect');
    }

    this.runOnWindowLoad(resizeAt, smallerThan, callback);
  }

  /**
   * This function checks if smaller device sizes have already been set
   * and script for them has already run (if current screen width is smaller
   * than those devices). If not, then the provided function will be called
   * so that callback function is run at start of the application.
   *
   * @param resizeAt point at which media query is called
   * @param smallerThan Is the function called at smaller than resizeAt point?
   * @param f function that is assigned to that screen size
   */
  private runOnWindowLoad = (resizeAt: number, smallerThan: boolean, f: Function) => {
    let found = false;

    // Loop through resizeAt points from smallest to largest
    for (let i = 0; i < this.callbacks.length; i++) {
      const cb = this.callbacks[i];

      // If current screen width is smaller then resizeAt point
      if (window.innerWidth < cb.resizeAt) {
        found = true;

        // If callback function has been set
        if (cb.is_f1_set && !cb.calledAtStart) {
          cb.f1();
          cb.calledAtStart = true;
        }

        break; // Stop any further loop execution
      }
    }

    // If not found, it means the screen width is > largest resizeAt point
    if (!found) {
      const cb = this.callbacks[this.callbacks.length - 1];

      // Run the script for the largest screen size if it hasn't been called already
      if (cb.is_f2_set && !cb.calledAtStart) {
        cb.f2();
        cb.calledAtStart = true;
      }
    }
  }

  /**
   * Create a list of callback functions. This is needed as
   * a temporary placeholder because the callbacks will be
   * reassigned later by user.
   */
  private createCallbacks() {
    this.resizeAt.forEach((size) => {
      this.callbacks.push({
        resizeAt: size,
        f1: () => {},
        f2: () => {},
        calledAtStart: false,
        is_f1_set: false,
        is_f2_set: false
      });
    });
  }

  /**
   * Create the list for media queries that countain information
   * about when the media query is called, the function for when
   * screen is larger then the resizeAt point and function for
   * when screen is smaller then resize point
   */
  private createMediaQueriesList() {

    // For each window size
    this.resizeAt.forEach((size) => {
      const cb = this.findCallback(size);

      // Add object to list of mediaQueries
      this.mediaQueries.push({
        resizeAt: size,
        query: window.matchMedia(`all and (max-width: ${size}px)`),
        f1: () => { cb.f1(); }, // function[0] = larger  than resizeAt point
        f2: () => { cb.f2(); }  // function[1] = smaller than resizeAt point
      });
    });
  }

  /**
   * Add media listeners to all resize points. Get even handlers to
   * call the associated functions for each resize point. If a
   * function is undefined, it will not be called. If later a
   * function will change, it will call the updated function.
   */
  private addMediaListeners = () => {
    this.mediaQueries.forEach((q) => {
      addMediaListener(q.query, q.f1, q.f2);
    });

    /**
     * Add media query listener to a screen resize point
     *
     * @param mediaQuery Media query object to add listener to
     * @param largerThan Function to call for smaller screen
     * @param smallerThan Function to call for larger screen
     */
    function addMediaListener(mediaQuery, f1, f2) {
      mediaQuery.addListener(() => {
        // From larger to smaller size
        if (mediaQuery.matches) {
          f1();

        // From smaller to larger size
        } else {
          f2();
        }
      });
    }
  }

  /**
   * Finds and returns a query object from list of queries.
   *
   * @param resizeAt Point at which media query is called
   */
  private findQuery = (resizeAt: number) => {
    let q;

    this.mediaQueries.forEach((query) => {
      if (query.resizeAt === resizeAt) {
        q = query;
      }
    });

    return q;
  }

  /**
   * Finds and returns a callback function from list of callbacks.
   *
   * @param resizeAt Point at which media query is called
   */
  private findCallback = (resizeAt: number, otherPoint?: boolean, next?: boolean) => {
    let cb;

    // Loop through callback functions
    for (let i = 0; i < this.callbacks.length; i++) {
      // If the correct callback is found
      if (this.callbacks[i].resizeAt === resizeAt) {
        // If next or previous callback is required
        if (otherPoint) {
          (next) ? cb = this.callbacks[i + 1] : cb = this.callbacks[i - 1];
        } else {
          cb = this.callbacks[i];
        }
      }
    }
    return cb;
  }

}
