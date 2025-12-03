import VirtualDataform from './VirtualDataform.js';
import { strToU8 } from 'fflate';
import type { AsyncZippable } from 'fflate';

export default class QuercusPage extends VirtualDataform {
  private body: string;

  constructor(pageLink: string, pageName: string, body: string) {
    super(pageLink, pageName);
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
