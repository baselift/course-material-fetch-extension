import APIAccessibleSection from './APIAccessibleSection.js';
import type { Nullable, Item } from '../common.js';

interface RawModuleData {
  temp: string;
}

export default class Modules extends APIAccessibleSection {
  constructor(courseId: number) {
    super(courseId, 'modules');
  }

  async getSectionItems(): Promise<Nullable<Array<Item>>> {
    const response = await fetch(this.assignedAPIEndpoint({}));
    if (response.ok === false) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseData: RawModuleData = await response.json();
    return null;
  }
}
