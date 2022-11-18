import { Card, Divider, TextField } from "@mui/material";
import "../resources/styles/Calendar.c.css";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";

// const theme = createMuiTheme({
//   palette: {
//     primary: { light: green[300], main: green[500], dark: green[700] }
//   }
// });

export const MuiCalendar = (props: { d: Date; sd: any }) => {
  const handleDateChange = (d: Date | null) => {
    if (!d) return;
    const date = d as any;
    props.sd(d);
    //@ts-ignore
    console.log(d._d as Date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={props.d}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export const Calendar_ = (props: { date: Date; setDate: any }) => {
  return (
    <div className="calendarwrapper">
      <Card>
        <MuiCalendar d={props.date} sd={props.setDate}></MuiCalendar>
        <Divider></Divider>
        <div className="ws-card-title">Cycle 1 Day A</div>
      </Card>
    </div>
  );
};

export default Calendar_;
