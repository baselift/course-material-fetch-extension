import { Pages, Folder } from '@extension/shared';
import type { Course } from '@extension/shared';

export const getDataFromCourses = async (courses: Course[]) => {
  const coursePageFolders: Folder[] = [];

  for (const course of courses) {
    const id = course.courseId;
    const page: Pages = new Pages(id);
    const dataFolder = await page.getDataFolder();
    if (dataFolder) {
      coursePageFolders.push(dataFolder);
    }
  }

  const pagesFolder = new Folder('pages', ...coursePageFolders);
  const dataFolder = new Folder('data', pagesFolder);
  return dataFolder;
};
