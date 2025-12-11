import APIAccessibleCourseSection from './APIAccessibleCourseSection.js';
import type { Nullable } from '../../utils/common/types.js';
import type Dataform from '../dataforms/Dataform.js';

interface RawModuleData {
  temp: string;
}

export default class Modules extends APIAccessibleCourseSection {
  constructor(courseId: number) {
    super(courseId, 'modules');
  }

  async getSectionItems(): Promise<Nullable<Array<Dataform>>> {
    const response = await fetch(this.assignedAPIEndpoint({}));
    if (response.ok === false) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseData: RawModuleData = await response.json();
    return null;
  }
}
