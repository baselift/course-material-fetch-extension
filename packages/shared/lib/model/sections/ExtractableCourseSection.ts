import ExtractableSection from './ExtractableSection.js';

export default abstract class ExtractableCourseSection extends ExtractableSection {
  protected courseId: number;

  constructor(courseId: number, sectionName: string) {
    super(sectionName);
    this.courseId = courseId;
  }

  getCourseId() {
    return this.courseId;
  }
}
