export default class DefaultMap extends Map {
  #_default;

  constructor(defaultValue) {
    super();
    this.#_default = defaultValue;
  }

  get(key) {
    const v = super.get(key);
    if (v === undefined) {
      if (typeof this.#_default === "function") {
        super.set(key, this.#_default());
      } else {
        super.set(key, this.#_default);
      }
      return super.get(key);
    }
    return v;
  }
}
