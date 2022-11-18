import { useState } from "react";
import "../resources/styles/Workspace.c.css";
import { BusETAs } from "./BusETAs";
import Calendar from "./Calendar";
import Timetable from "./Timetable";

export const Workspace = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="workspace">
      <div className="workspace-wrapper">
        <div className="workspace-left">
          <Calendar date={selectedDate} setDate={setSelectedDate} />
        </div>
        <div className="workspace-center">
          <Timetable date={selectedDate} setDate={setSelectedDate} />
        </div>
        <div className="workspace-right">{/* <BusETAs /> */}</div>
      </div>
    </div>
  );
};

export default Workspace;
