import APIAccessibleSection from './APIAccessibleSection.js';
import QuercusPage from '../dataforms/QuercusPage.js';
import type { Item, Nullable } from '../../utils/common/types.js';

interface RawPageData {
  body?: Nullable<string>;
  created_at: Nullable<string>;
  editing_roles: Nullable<string>;
  front_page: Nullable<boolean>;
  hide_from_students: Nullable<boolean>;
  html_url: Nullable<string>;
  last_edited_by: Nullable<object>;
  locked_for_user: Nullable<boolean>;
  page_id: Nullable<number>;
  publish_at: Nullable<string>;
  published: Nullable<boolean>;
  title: Nullable<string>;
  todo_date: Nullable<string>;
  updated_at: Nullable<string>;
  url: Nullable<string>;
}

export default class Pages extends APIAccessibleSection {
  constructor(courseId: number) {
    super(courseId, 'pages');
  }

  async getSectionItems(): Promise<Nullable<Array<Item>>> {
    const response = await fetch(this.assignedAPIEndpoint({ 'include[]': 'body', per_page: '30' }));
    if (response.ok === false) {
      return null;
    }

    const responseData: Array<RawPageData> = await response.json();
    const sectionItemArray: Array<Item> = [];

    // check if responseData is iterable (avoid possible edge cases)
    if (responseData?.[Symbol.iterator]) {
      for (const pageData of responseData) {
        const body = pageData.body;
        const page_id = pageData.page_id;
        const html_url = pageData.html_url;
        const title = pageData.title;

        if (body != null && page_id != null && html_url != null && title != null) {
          sectionItemArray.push({
            id: page_id,
            type: new QuercusPage(html_url, title, body),
          });
        }
      }
      return sectionItemArray;
    } else {
      return null;
    }
  }
}
