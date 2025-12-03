import Dataform from './Dataform.js';

export default abstract class VirtualDataform extends Dataform {
  protected link: string;

  constructor(link: string, name: string) {
    super(name);
    this.link = link;
  }
}
