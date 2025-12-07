import VirtualDataform from './VirtualDataform.js';
import type { AsyncZippable } from 'fflate';

export default class QuercusFile extends VirtualDataform {
  protected ext: string;

  constructor(fileLink: string, fileName: string, ext: string) {
    super(fileLink, fileName);
    this.ext = ext;
  }

  toZippable(): AsyncZippable {
    throw new Error('Method not implemented.');
  }
}
