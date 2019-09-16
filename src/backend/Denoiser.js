class Denoiser {

  /**
   * Creates an Alphabetizer object with internal storage for the lines that
   * it needs to denoise. Defaults the input line array to null.
   */
  constructor() {
    this.srcTextLines = null;
  }

  /**
   * Assigns the array of lines that will be processed by the denoiser.
   * @param lines An array of strings.
   */
  setInputLines(lines) {
    this.srcTextLines = lines;
  }

  /**
   * Returns a denoised version of the currently cached lines of text. Returns an empty
   * array if the cached array is null or empty.
   * @returns {[]} An array of strings.
   */
  getDenoisedLines() {
    // TODO: Implement
    if (this.srcTextLines === null || this.srcTextLines.length === 0)
      return [];
    return this.srcTextLines;
  }

}

export default Denoiser;
