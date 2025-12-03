import { createDownloadMessage, Dataform, Folder, Pages } from '@extension/shared';
import { useRef, useState } from 'react';
import type { Course } from '@extension/shared';
import type { ChangeEventHandler } from 'react';
import './CourseSelection.css';

const CourseItem = ({
  name,
  id,
  checked,
  onCheckboxUpdate,
}: {
  name: string;
  id: number;
  checked: boolean;
  onCheckboxUpdate: ChangeEventHandler<HTMLInputElement>;
}) => {
  const strId: string = id.toString();
  return (
    <div className="m-2 flex items-center">
      <input type="checkbox" id={strId} onChange={onCheckboxUpdate} checked={checked} />
      <label htmlFor={strId} className="ml-[0.4rem]">
        {name}
      </label>
    </div>
  );
};

const CourseSelection = ({ courses }: { courses: Array<Course> }) => {
  const [checkedState, setCheckedState] = useState<Array<boolean>>(new Array(courses.length).fill(false));
  const selectAll = useRef(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll.current;
    selectAll.current = newSelectAll;
    setCheckedState(checkedState => checkedState.map(() => newSelectAll));
  };

  const handleSelect = (targetIndex: number) =>
    setCheckedState(checkedState => checkedState.map((checked, index) => (index === targetIndex ? !checked : checked)));

  const handleSubmit = async () => {
    const coursePageFolders: Folder[] = [];
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        const course = courses[i];
        const courseId = course.courseId;
        const page: Pages = new Pages(courseId);
        const items = await page.getSectionItems();
        if (items) {
          const dataforms = Dataform.fromItems(...items);
          const folder = new Folder(courseId.toString(), ...dataforms);
          coursePageFolders.push(folder);
        }
      }
    }
    const pagesFolder = new Folder('pages', ...coursePageFolders);
    const u8Data = await pagesFolder.getZippedData();
    const blob = new Blob([new Uint8Array(u8Data)], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    await chrome.runtime.sendMessage(createDownloadMessage(url));
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="flex h-full w-full flex-col">
      <div className="grow-0 border-b p-2">
        <label htmlFor="selectAll">Select all:</label>
        <input type="checkbox" className="ml-1" id="selectAll" onClick={handleSelectAll} />
      </div>
      <div className="w-full grow basis-auto overflow-y-auto">
        {courses.map((course, index) => (
          <CourseItem
            name={course.courseName}
            id={course.courseId}
            checked={checkedState[index]}
            onCheckboxUpdate={() => handleSelect(index)}
          />
        ))}
      </div>
      <div className="grow-0">
        <button id="submitBttn" className="w-full border-[0.1rem] border-solid bg-[#ededed]" onClick={handleSubmit}>
          Scrape!
        </button>
      </div>
    </section>
  );
};

export default CourseSelection;
