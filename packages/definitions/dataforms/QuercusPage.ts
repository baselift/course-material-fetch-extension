import Dataform from './Dataform.js';

export default class QuercusPage extends Dataform {
  private body: string;

  constructor(pageLink: string, pageName: string, body: string) {
    super(pageLink, pageName);
    this.body = body;
  }

  save(): void {
    throw new Error('Method not implemented.');
  }
}
