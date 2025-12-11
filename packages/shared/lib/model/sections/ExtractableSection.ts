import Folder from '../dataforms/Folder.js';
import type { Nullable } from '../../utils/common/types.js';
import type Dataform from '../dataforms/Dataform.js';

/**
 * Represents a section of extractable data on Quercus.
 */
export default abstract class ExtractableSection {
  protected sectionName: string;

  constructor(sectionName: string) {
    this.sectionName = sectionName;
  }

  public async getDataFolder(): Promise<Nullable<Folder>> {
    const items = await this.getSectionItems();
    if (items) {
      return new Folder(this.sectionName, ...items);
    }
    return null;
  }

  getSectionName() {
    return this.sectionName;
  }

  /**
   * Grabs and returns all the items associated with this ExtractableSection. Returns null if there are
   * no items present or the section does not exist.
   */
  abstract getSectionItems(): Promise<Nullable<Array<Dataform>>>;
}
