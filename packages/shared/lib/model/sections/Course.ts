import ExtractableCourseSection from './ExtractableCourseSection.js';
import Pages from './Pages.js';
import type { Nullable } from '../../utils/common/types.js';
import type Dataform from '../dataforms/Dataform.js';

export default class Course extends ExtractableCourseSection {
  private pagesSection: Pages;

  constructor(courseId: number, courseName: string) {
    super(courseId, courseName);
    this.pagesSection = new Pages(courseId);
  }

  /**
   * Return an array of folders which contain data for all sections related to a Quercus course.
   */
  async getSectionItems(): Promise<Nullable<Array<Dataform>>> {
    const pagesFolder = await this.pagesSection.getDataFolder();

    if (pagesFolder) {
      return [pagesFolder];
    }
    return null;
  }
}
