import CourseSelection from './CourseSelection/CourseSelection';
import TabError from './errors/TabError';
import { QUERCUS_BASE_API_ENDPOINT, QUERCUS_BASE_URL, Course } from '@extension/shared';
import '@src/index.css';
import { createRoot } from 'react-dom/client';
import type { Nullable } from '@extension/shared';

interface RawCourse {
  account_id: Nullable<string>;
  apply_assignment_group_weights: Nullable<boolean>;
  blueprint: Nullable<boolean>;
  calendar: Nullable<object>;
  course_code: Nullable<string>;
  course_color: Nullable<string>;
  created_at: Nullable<string>;
  default_view: Nullable<string>;
  end_at: Nullable<string>;
  enrollment_term_id: Nullable<number>;
  enrollments: Nullable<object>;
  friendly_name: Nullable<string>;
  grade_passback_setting: Nullable<string>;
  grading_standard_id: Nullable<number>;
  hide_final_grades: Nullable<boolean>;
  homeroom_course: Nullable<boolean>;
  id: Nullable<number>;
  is_public: Nullable<boolean>;
  is_public_to_auth_users: Nullable<boolean>;
  license: Nullable<string>;
  name: Nullable<string>;
  overridden_course_visibility?: string;
  public_syllabus: Nullable<boolean>;
  public_syllabus_to_auth: Nullable<boolean>;
  restrict_enrollments_to_course_dates: Nullable<boolean>;
  root_account_id: Nullable<number>;
  start_at: Nullable<string>;
  storage_quota_mb: Nullable<number>;
  template: Nullable<boolean>;
  time_zone: Nullable<string>;
  uuid: Nullable<string>;
  workflow_state: Nullable<string>;
  access_restricted_by_date?: boolean;
}

const mapResponseToCourses = (obj: RawCourse): Course | [] => {
  if (!obj.access_restricted_by_date && obj.name !== null && obj.id !== null) {
    return new Course(obj.id, obj.name);
  }
  return []; // means that this entry will be removed in the new array
};

const init = async () => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  // TODO: Check when user switches away from quercus and update
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  if (tab.url?.startsWith(QUERCUS_BASE_URL)) {
    const rawCoursesArray: Array<RawCourse> = await (
      await fetch(`${QUERCUS_BASE_API_ENDPOINT}/users/self/courses?per_page=100`)
    ).json();
    const coursesArray = rawCoursesArray.flatMap(mapResponseToCourses);
    root.render(<CourseSelection courses={coursesArray} />);
  } else {
    root.render(<TabError />);
  }
};

init();
