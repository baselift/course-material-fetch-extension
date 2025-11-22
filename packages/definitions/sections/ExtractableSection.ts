import type { Item, Nullable } from '../common.js';

export default abstract class ExtractableSection {
  /**
   * Grabs and returns all the items associated with this ExtractableSection. Returns null if there are
   * no items present or the section does not exist.
   */
  abstract getSectionItems(): Promise<Nullable<Array<Item>>>;
}
