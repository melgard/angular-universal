export class Serializable {
  fromJSON(object: any) {
    for (const propName in object) this[propName] = object[propName];
    return this;
  }
}
