import { Folder } from '@extension/shared';
import type { Course } from '@extension/shared';

export const getDataFromCourses = async (courses: Course[]) => {
  const courseFolders: Folder[] = [];

  for (const course of courses) {
    const courseFolder = await course.getDataFolder();
    if (courseFolder) {
      courseFolders.push(courseFolder);
    }
  }

  const dataFolder = new Folder('data', ...courseFolders);
  return dataFolder;
};
