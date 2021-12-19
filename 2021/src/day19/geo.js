export class Vector {
  #_x;
  #_y;
  #_z;

  constructor(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  isSameVector(otherVector) {
    return (
      this.x === otherVector.x &&
      this.y === otherVector.y &&
      this.z === otherVector.z
    );
  }
}

export class Point {
  #_x;
  #_y;
  #_z;

  constructor(coordinateString, ny, nz) {
    if (typeof coordinateString === "string") {
      const [x, y, z] = coordinateString.split(",").map(Number);
      this._x = x;
      this._y = y;
      this._z = z;
    } else {
      this._x = coordinateString;
      this._y = ny;
      this._z = nz;
    }
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  toString() {
    return `${this.x},${this.y},${this.z}`;
  }

  getVectorTo(point) {
    return new Vector(this.x - point.x, this.y - point.y, this.z - point.z);
  }

  withTranslation(dx, dy, dz) {
    return new Point(this.x + dx, this.y + dy, this.z + dz);
  }

  manhattanDistanceTo(point) {
    return (
      Math.abs(this.x - point.x) +
      Math.abs(this.y - point.y) +
      Math.abs(this.z - point.z)
    );
  }
}

export class Triangle {
  #_a;
  #_b;
  #_c;

  #_ab;
  #_bc;
  #_ca;

  constructor(a, b, c) {
    this._a = a;
    this._b = b;
    this._c = c;

    this._ab = Math.sqrt(
      (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2,
    );
    this._bc = Math.sqrt(
      (b.x - c.x) ** 2 + (b.y - c.y) ** 2 + (b.z - c.z) ** 2,
    );
    this._ca = Math.sqrt(
      (c.x - a.x) ** 2 + (c.y - a.y) ** 2 + (c.z - a.z) ** 2,
    );
  }

  get a() {
    return this._a;
  }
  get b() {
    return this._b;
  }
  get c() {
    return this._c;
  }

  get ab() {
    return this._ab;
  }
  get bc() {
    return this._bc;
  }
  get ca() {
    return this._ca;
  }

  isSameTriangle(other) {
    const same =
      (this.ab === other.ab && this.bc === other.bc && this.ca === other.ca) ||
      (this.ab === other.bc && this.bc === other.ca && this.ca === other.ab) ||
      (this.ab === other.ca && this.bc === other.ab && this.ca === other.bc);

    if (same) {
      const pointMapping = [];

      if (this.ab === other.ab) {
        if (this.bc === other.bc) {
          // AB ab | BC bc | CA ca
          pointMapping.push(
            [this.a, other.a],
            [this.b, other.b],
            [this.c, other.c],
          );
        } else if (this.bc === other.ca) {
          // AB ab | BC ca | CA bc
          pointMapping.push(
            [this.a, other.a],
            [this.b, other.c],
            [this.c, other.b],
          );
        }
      } else if (this.ab === other.bc) {
        // AB bc
        if (this.bc === other.ab) {
          // AB bc | BC ab | CA ca
          pointMapping.push(
            [this.a, other.c],
            [this.b, other.b],
            [this.c, other.a],
          );
        } else {
          // AB bc | BC ca | CA ab
          pointMapping.push(
            [this.a, other.b],
            [this.b, other.c],
            [this.c, other.a],
          );
        }
      } else if (this.ab === other.ca) {
        // AB ca
        if (this.bc === other.bc) {
          // AB ca | BC bc | CA ab
          pointMapping.push(
            [this.a, other.a],
            [this.b, other.c],
            [this.c, other.b],
          );
        } else {
          // AB ca | BC ab | CA bc
          pointMapping.push(
            [this.a, other.c],
            [this.b, other.a],
            [this.c, other.b],
          );
        }
      }

      return pointMapping;
    }
    return false;
  }
}

export function* rotations() {
  yield (point) => new Point(point.x, point.y, point.z);
  yield (point) => new Point(point.x, -point.z, point.y);
  yield (point) => new Point(point.x, -point.y, -point.z);
  yield (point) => new Point(point.x, point.z, -point.y);

  yield (point) => new Point(-point.y, point.x, point.z);
  yield (point) => new Point(point.z, point.x, point.y);
  yield (point) => new Point(point.y, point.x, -point.z);
  yield (point) => new Point(-point.z, point.x, -point.y);

  yield (point) => new Point(-point.x, -point.y, point.z);
  yield (point) => new Point(-point.x, -point.z, -point.y);
  yield (point) => new Point(-point.x, point.y, -point.z);
  yield (point) => new Point(-point.x, point.z, point.y);

  yield (point) => new Point(point.y, -point.x, point.z);
  yield (point) => new Point(point.z, -point.x, -point.y);
  yield (point) => new Point(-point.y, -point.x, -point.z);
  yield (point) => new Point(-point.z, -point.x, point.y);

  yield (point) => new Point(-point.z, point.y, point.x);
  yield (point) => new Point(point.y, point.z, point.x);
  yield (point) => new Point(point.z, -point.y, point.x);
  yield (point) => new Point(-point.y, -point.z, point.x);

  yield (point) => new Point(-point.z, -point.y, -point.x);
  yield (point) => new Point(-point.y, point.z, -point.x);
  yield (point) => new Point(point.z, point.y, -point.x);
  yield (point) => new Point(point.y, -point.z, -point.x);
}
