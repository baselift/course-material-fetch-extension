import ExtractableCourseSection from './ExtractableCourseSection.js';
import { QUERCUS_BASE_API_ENDPOINT } from '../../utils/common/const.js';

export default abstract class APIAccessibleCourseSection extends ExtractableCourseSection {
  constructor(courseId: number, sectionName: string) {
    super(courseId, sectionName);
  }

  public assignedAPIEndpoint(queryParams: Record<string, string>): string {
    let constructedString = `${QUERCUS_BASE_API_ENDPOINT}/courses/${this.courseId}/${this.sectionName}`;
    let firstParam = true;

    for (const [key, value] of Object.entries(queryParams)) {
      if (firstParam) {
        constructedString = constructedString.concat('?', `${key}=${value}`);
        firstParam = false;
      } else {
        constructedString = constructedString.concat('&', `${key}=${value}`);
      }
    }
    return constructedString;
  }
}
