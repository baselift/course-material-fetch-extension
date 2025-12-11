import Dataform from './Dataform.js';

export default abstract class QuercusDataform extends Dataform {
  protected link: string;

  constructor(link: string, name: string, id?: string) {
    super(name, id);
    this.link = link;
  }
}
