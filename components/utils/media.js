const mobileMaxWidth = 600; //px

/**
 *
 * @returns {Boolean}
 */
export const isMobileDevice = () => window.matchMedia?.(`(max-width: ${mobileMaxWidth}px)`)?.matches ?? false;