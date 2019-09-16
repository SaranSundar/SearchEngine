class Alphabetizer {

  /**
   * Creates an Alphabetizer object with internal storage for the lines that
   * it needs to alphabetize. Defaults the input line array to null.
   */
  constructor() {
    this.srcTextLines = null;
  }

  /**
   * Assigns the array of lines that will be processed by the alphabetizer.
   * @param lines An array of strings.
   */
  setInputLines(lines) {
    this.srcTextLines = lines;
  }

  /**
   * Returns a sorted version of the currently cached lines of text. Returns an empty
   * array if the cached array is null or empty.
   * @returns {[]} An array of strings.
   */
  getAlphabetizedLines() {
    if (this.srcTextLines === null || this.srcTextLines.length === 0)
      return [];
    return this.srcTextLines.sort();
  }

}

export default Alphabetizer;
