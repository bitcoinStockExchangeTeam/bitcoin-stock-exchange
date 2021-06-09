import { v4 as uuidv4 } from 'uuid';

export class StockBuilder {
  setUuid() {
    this.uuid = uuidv4();
    return this;
  }

  setName(name) {
    this.name = name.length === 7 ? name.slice(1, 4) : name.slice(1, 5);
    return this;
  }

  setChange(change) {
    this.change = change;
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
      uuid: this.uuid,
      name: this.name,
      change: this.change,
      price: this.price,
      cap: this.cap
    });
  }
}
