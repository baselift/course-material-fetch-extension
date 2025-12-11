import QuercusDataform from './QuercusDataform.js';
import type { AsyncZippable } from 'fflate';

export default class QuercusFile extends QuercusDataform {
  protected ext: string;

  constructor(id: string, fileLink: string, fileName: string, ext: string) {
    super(fileLink, fileName, id);
    this.ext = ext;
  }

  toZippable(): AsyncZippable {
    throw new Error('Method not implemented.');
  }
}
