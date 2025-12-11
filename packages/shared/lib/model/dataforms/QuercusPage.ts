import QuercusDataform from './QuercusDataform.js';
import { strToU8 } from 'fflate';
import type { AsyncZippable } from 'fflate';

export default class QuercusPage extends QuercusDataform {
  private body: string;

  constructor(id: string, pageLink: string, pageName: string, body: string) {
    super(pageLink, pageName, id);
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  toZippable(): AsyncZippable {
    const fileName = `${this.name}.html`;

    return {
      [fileName]: strToU8(this.body),
    };
  }
}
