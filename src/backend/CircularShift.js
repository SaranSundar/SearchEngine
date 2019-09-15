class CircularShift {

  /**
   * Creates a CircularShift object with internal storage for the line that
   * it needs to circular shift. Defaults the input line to null.
   */
  constructor() {
    this.srcText = null;
  }

  /**
   * Generates an array of lines by circular shifting the words in an input line.
   * @returns {[]} An array of strings. Returns an empty array if the currently set
   * input line is either null or empty.
   * @private
   */
  _circularShift() {
    // Return empty array if there is nothing to process
    if (this.srcText === null) return [];

    // List of words inside this line
    const words = this.srcText.split(' ');
    // Return empty array if input line is empty
    if (this.srcText.length() === 0) return [];
    // List of lines generated from circular shift process
    const lines = [];

    // Number of lines to be generated = number of words
    for (let iteration = 0; iteration < words.length; iteration++) {
      // Create line by appending all words
      let line = "";
      words.forEach(word => line += word);
      // Add line to internal storage array
      lines.push(line);

      // Move first word to the end
      words.push(words.shift());
    }

    // Return the lines
    return lines;
  }

  /**
   * Commands this circular shift object to process the input line given to it.
   * @returns {*[]} An array of lines made from circular shifting the input line.
   */
  getShiftedLines() {
    return this._circularShift();
  }

  /**
   * Sets the input line that the circular shift algorithm will process.
   * @param input A string of text.
   */
  setInputLine(input) {
    this.srcText = input;
  }

}

export default CircularShift;
