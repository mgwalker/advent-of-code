export default class CountingSet extends Map {
  add(value) {
    super.set(value, (super.get(value) ?? 0) + 1);
  }

  count(value) {
    return super.get(value) ?? 0;
  }

  delete(value) {
    super.set(value, (super.get(value) ?? 1) - 1);
  }

  remove(value) {
    super.delete(value);
  }
}
