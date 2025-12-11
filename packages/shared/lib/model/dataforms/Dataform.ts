import type { AsyncZippable } from 'fflate';

export default abstract class Dataform {
  protected name: string;
  protected id?: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id;
  }

  abstract toZippable(): AsyncZippable;
}
