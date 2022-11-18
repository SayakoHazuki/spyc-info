import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { ReactElement, useEffect } from "react";
import "../resources/styles/Timetable.c.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used


async function fetchAPI(cls: string) {
  const url = "https://iot.spyc.hk/timetable?cl=" + cls;
  const response = await fetch(url);
  return await response.json();
}

async function getLessonList(class_: string, day: string) {
  console.log(day);
  day = day.replace("/", "A");
  const lessonsJSON = await fetchAPI(class_);
  if (!(day in lessonsJSON)) return [];
  return lessonsJSON[day] as {
    subject: string;
    venue: string;
  }[];
}

async function getDayOfCycle(d: Date) {
  console.log(d)
  const now = new Date();
  //@ts-ignore
  const date = (d._d as Date).toDateString();
  const url = "https://iot.spyc.hk/cyclecal";
  const response = await fetch(url);
  const data = await response.json();
  const dayOfCycle = data[date];
  return dayOfCycle;
}

export const SectionItem = (props: { subject: string; venue: string }) => {
  const { subject, venue } = props;
  return (
    <div className="section-item">
      <div className="section-item-subject">{subject}</div>
      <div className="section-item-venue">{venue}</div>
    </div>
  );
};

export const Timetable = (props: { date: Date; setDate: any }) => {
  const [icon, setIcon] = React.useState<ReactElement|null>(null);
  const times = ["8:40", "9:35", "10:50", "11:45", "13:50", "14:45"];
  const [lessons, setLessons] = React.useState<
    { subject: string; venue: string }[]
  >([]);
  const SectionItem = (props: {
    subject: string;
    venue: string;
    index: number;
  }) => (
    <div className="tt-item tt-border">
      <div className="tt-item tt-time"> {times[props.index]}</div>
      <div className="tt-item tt-subject">{props.subject}</div>
      <div className="tt-item tt-venue">{props.venue}</div>
    </div>
  );
  const [cls, setCls] = React.useState("1A");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCls(event.target.value as string);
  };

  useEffect(() => {
    setIcon(<FontAwesomeIcon icon={["fas", "spinner"]} spin />);
    setLessons([]);
    /* update lesson list */
    (async () => {
      const dayOfCycle = await getDayOfCycle(props.date);
      const lessons = await getLessonList(cls, dayOfCycle);
      console.log(lessons);
      setLessons(lessons);
    })();
  }, [cls, props.date]);

  // setCls("1A");

  return (
    <div className="timetable-wrapper">
      <Card>
        <div className="ws-card-title">
          Timetable
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-cls">Class</InputLabel>
            <Select
              labelId="select-cls"
              id="select-cls"
              value={cls}
              label="Age"
              //@ts-ignore
              onChange={handleChange}
            >
              <MenuItem value="1A">
                <em>S.1A</em>
              </MenuItem>
              <MenuItem value="1B">S.1B</MenuItem>
              <MenuItem value="1C">S.1C</MenuItem>
              <MenuItem value="1D">S.1D</MenuItem>

              <MenuItem value="2A">
                <em>S.2A</em>
              </MenuItem>
              <MenuItem value="2B">S.2B</MenuItem>
              <MenuItem value="2C">S.2C</MenuItem>
              <MenuItem value="2D">S.2D</MenuItem>

              <MenuItem value="3A">
                <em>S.3A</em>
              </MenuItem>
              <MenuItem value="3B">S.3B</MenuItem>
              <MenuItem value="3C">S.3C</MenuItem>
              <MenuItem value="3D">S.3D</MenuItem>
              <MenuItem value="3E">S.3E</MenuItem>

              <MenuItem value="4A">
                <em>S.4A</em>
              </MenuItem>
              <MenuItem value="4B">S.4B</MenuItem>
              <MenuItem value="4C">S.4C</MenuItem>
              <MenuItem value="4D">S.4D</MenuItem>

              <MenuItem value="5A">
                <em>S.5A</em>
              </MenuItem>
              <MenuItem value="5B">S.5B</MenuItem>
              <MenuItem value="5C">S.5C</MenuItem>
              <MenuItem value="5D">S.5D</MenuItem>

              <MenuItem value="6A">
                <em>S.6A</em>
              </MenuItem>
              <MenuItem value="6B">S.6B</MenuItem>
              <MenuItem value="6C">S.6C</MenuItem>
              <MenuItem value="6D">S.6D</MenuItem>
            </Select>
          </FormControl>
        </div>
        {lessons.map((lesson, index) => (
          <SectionItem
            subject={lesson.subject}
            venue={lesson.venue}
            index={index}
          />
        ))}
        {icon ? icon : null}
      </Card>
    </div>
  );
};

export default Timetable;
