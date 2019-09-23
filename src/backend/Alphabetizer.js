class Alphabetizer {

  /**
   * Creates an Alphabetizer object with internal storage for the lines that
   * it has alphabetized.
   */
  constructor(startingLines = []) {
    this.alphabetizedLines = startingLines;
  }

  /**
   * Adds lines to be sorted to currently alphabetized lines. Then alphabetizes all lines.
   * @param lines An array of strings.
   */
  alphabetize(lines) {
    lines.forEach(line => {
      if(line.length !== 0 && !this.alphabetizedLines.includes(line))
        this.alphabetizedLines.push(line);
    });

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
