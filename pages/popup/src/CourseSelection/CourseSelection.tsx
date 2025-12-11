import 'webextension-polyfill';
import { getDataFromCourses } from './utils';
import { createMessage, DownloadProgressSchema, DownloadType } from '@extension/shared';
import { useRef, useState } from 'react';
import type { Course } from '@extension/shared';
import type { ChangeEventHandler } from 'react';
import './CourseSelection.css';

enum ScrapeStatus {
  DEFAULT = 'Scrape!',
  FETCH = 'Fetching...',
  DOWNLOAD = 'Downloading...',
}

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
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(ScrapeStatus.DEFAULT);
  const selectAll = useRef(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll.current;
    selectAll.current = newSelectAll;
    setCheckedState(checkedState => checkedState.map(() => newSelectAll));
  };

  const handleSelect = (targetIndex: number) =>
    setCheckedState(checkedState => checkedState.map((checked, index) => (index === targetIndex ? !checked : checked)));

  const handleSubmit = async () => {
    const filteredCourses = courses.filter((_course, index) => checkedState[index]);
    if (filteredCourses.length > 0) {
      setStatusMessage(ScrapeStatus.FETCH);
      const dataFolder = await getDataFromCourses(filteredCourses);
      const blob = await dataFolder.toBlob();
      const url = window.URL.createObjectURL(blob);
      const port = chrome.runtime.connect();
      port.onMessage.addListener(msg => {
        const parsedMsg = DownloadProgressSchema.safeParse(msg);
        if (parsedMsg.success) {
          const msg = parsedMsg.data;
          setProgress(msg.progress);
        }
      });
      port.onDisconnect.addListener(() => {
        window.URL.revokeObjectURL(url);
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setStatusMessage(ScrapeStatus.DEFAULT);
        }, 100);
      });
      port.postMessage(createMessage({ type: DownloadType, url: url }));
      setStatusMessage(ScrapeStatus.DOWNLOAD);
    }
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
            name={course.getSectionName()}
            id={course.getCourseId()}
            checked={checkedState[index]}
            onCheckboxUpdate={() => handleSelect(index)}
          />
        ))}
      </div>
      <div className="grow-0">
        <button
          id="submitBttn"
          className={`w-full border-[0.1rem] border-solid`}
          style={{
            background: `linear-gradient(to right, green ${progress}%, #ededed ${progress}% ${100 - progress}%`,
          }}
          onClick={handleSubmit}>
          {statusMessage}
        </button>
      </div>
    </section>
  );
};

export default CourseSelection;
