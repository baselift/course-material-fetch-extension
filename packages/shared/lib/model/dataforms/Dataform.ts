import type { Item } from '../../utils/common/types.js';
import type { AsyncZippable } from 'fflate';

export default abstract class Dataform {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  static fromItems(...items: Item[]): Dataform[] {
    return items.map(val => val.type);
  }

  abstract toZippable(): AsyncZippable;
}
