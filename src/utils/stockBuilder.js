import { v4 as uuidv4 } from 'uuid';

const shortNameLength = 7;
const shortCurrencyLength = 3;
const longCurrencyLength = 4;

const isNameShort = (name) => shortNameLength <= name.length;

const grabCurrencyName = (string, currencyLength) => {
  const currencyRegex = `[A-Z]{${currencyLength}}`;
  return string.match(currencyRegex)[0];
};

const decimalToPercent = (decimal) => decimal * 100;

export class StockBuilder {
  setName(name) {
    this.name = grabCurrencyName(name, isNameShort ? shortCurrencyLength : longCurrencyLength);
    return this;
  }

  setChange(change) {
    this.change = decimalToPercent(change);
    return this;
  }

  setPrice(price) {
    this.price = price;
    return this;
  }

  setCap(cap) {
    this.cap = cap;
    return this;
  }

  build() {
    return ({
      uuid: uuidv4(),
      name: this.name,
      change: this.change,
      price: this.price,
      cap: this.cap
    });
  }
}
