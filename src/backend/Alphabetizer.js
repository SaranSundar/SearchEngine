class Alphabetizer {

  /**
   * Creates an Alphabetizer object with internal storage for the lines that
   * it needs to alphabetize.
   */
  constructor() {
    this.alphabetizedLines = [];
  }

  /**
   * Adds lines to be sorted to currently alphabetized lines. Then alphabetizes all lines.
   * @param lines An array of strings.
   */
  alphabetize(lines) {
    this.alphabetizedLines = this.alphabetizedLines.concat(lines);
    this.alphabetizedLines.sort();

    return this.getAlphabetizedLines();
  }

  /**
   * Returns a sorted version of the currently cached lines of text.
   * @returns {[]} An array of strings.
   */
  getAlphabetizedLines() {
    // Create a copy of the source array, then sort and return it.
    return this.alphabetizedLines.concat();
  }

}

export default Alphabetizer;
