class Counter {
    static #count = 0;
    static increment() {
      if (Counter.#count === 2) return;
      Counter.#count++;
      return Counter.#count;
    }
  
    static isBlack() {
      return Counter.#count === 2;
    }
    static isWhite() {
      return Counter.#count === 1;
    }
  }
  
  module.exports = Counter; 