import { useState } from "react";
import "../resources/styles/Workspace.c.css";
import { BusETAs } from "./BusETAs";
import Calendar from "./Calendar";
import Timetable from "./Timetable";

let a = false;
const Loader = (props: { sd: any }) => {
  if (!a) setTimeout(() => props.sd(new Date()), 5000);
  a = true;
  return <div></div>;
};

export const Workspace = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cycleDayStr, setCycleDayStr] = useState<string>("");

  return (
    <div className="workspace">
      <div className="workspace-wrapper">
        <div className="workspace-left">
          <Calendar
            date={selectedDate}
            setDate={setSelectedDate}
            cycleDayStr={cycleDayStr}
          />
        </div>
        <div className="workspace-center">
          <Timetable
            date={selectedDate}
            setDate={setSelectedDate}
            setCycleDayStr={setCycleDayStr}
          />
        </div>
        <div className="workspace-right"><BusETAs /></div>
      </div>
      <Loader sd={setSelectedDate} />
    </div>
  );
};

export default Workspace;
