import { Folder, Dataform } from '../dataforms/index.js';
import type { Item, Nullable } from '../utils/common/types.js';

/**
 * Represents a section of extractable data for a Quercus course. For example, the Modules section, Pages section etc...
 */
export default abstract class ExtractableSection {
  protected courseId: number;
  protected sectionName: string;

  constructor(courseId: number, sectionName: string) {
    this.courseId = courseId;
    this.sectionName = sectionName;
  }

  public async getDataFolder(): Promise<Nullable<Folder>> {
    const items = await this.getSectionItems();
    if (items) {
      const dataforms = Dataform.fromItems(...items);
      return new Folder(this.courseId.toString(), ...dataforms);
    }
    return null;
  }

  /**
   * Grabs and returns all the items associated with this ExtractableSection. Returns null if there are
   * no items present or the section does not exist.
   */
  abstract getSectionItems(): Promise<Nullable<Array<Item>>>;
}
