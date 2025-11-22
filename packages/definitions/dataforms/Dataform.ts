export default abstract class Dataform {
  protected link: string;
  protected name: string;

  constructor(link: string, name: string) {
    this.link = link;
    this.name = name;
  }

  abstract save(): void;
}
