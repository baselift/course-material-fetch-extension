import Dataform from './Dataform.js';
import { zip } from 'fflate';
import type { AsyncZippable } from 'fflate';

export default class Folder extends Dataform {
  protected items: Dataform[];

  constructor(name: string, ...items: Dataform[]) {
    super(name);
    this.items = items;
  }

  private getZippableFromDataforms(...dataforms: Dataform[]): AsyncZippable {
    const zippables = dataforms.map(val => val.toZippable());
    const resultZippable: AsyncZippable = Object.assign({}, ...zippables);
    return resultZippable;
  }

  async getZippedData(): Promise<Uint8Array> {
    const resultZippable = this.toZippable();
    return await new Promise((resolve, reject) => {
      zip(resultZippable, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(new Uint8Array(data));
        }
      });
    });
  }

  async toBlob(): Promise<Blob> {
    const zippedData = await this.getZippedData();
    return new Blob([new Uint8Array(zippedData)], { type: 'application/zip' });
  }

  toZippable(): AsyncZippable {
    const resultZippable = this.getZippableFromDataforms(...this.items);
    return {
      [this.name]: resultZippable,
    };
  }
}
