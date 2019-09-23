class Denoiser {

  /**
   * Creates a Denoiser object with internal storage for the lines that
   * it has denoised.
   */
  constructor(startingLines = []) {
    this.denoisedLines = startingLines;
    this.noiseWords = ['and', 'or', 'the', 'but', 'of', 'so', 'at', 'be', 'a', 'is']
  }

  /**
   * Assigns the array of lines that will be processed by the denoiser.
   * @param lines An array of strings.
   */
  denoise(lines) {
    this.denoisedLines = lines.concat();
    for(let i = 0; i < this.denoisedLines.length; i++) {
      if(this.noiseWords.includes(this.denoisedLines[i].split(" ")[0].toLowerCase())) {
        this.denoisedLines.splice(i, 1);
        i--;
      }
    }

    return this.getDenoisedLines();
  }

  /**
   * Returns a denoised version of the currently cached lines of text.
   * @returns {[]} An array of strings.
   */
  getDenoisedLines() {
    return this.denoisedLines;
  }

}

export default Denoiser;
