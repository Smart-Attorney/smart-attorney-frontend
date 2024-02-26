import dayjs from "dayjs";
import { Calendar, CalendarProps, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

function EventCalendar(props: Omit<CalendarProps, "localizer">) {
	return (
		<Calendar
			className="p-4 mx-20 bg-white border-4 rounded-3xl border-violet-500"
			style={{ height: "80vh" }}
			localizer={localizer}
			defaultView="month"
			views={["month", "week", "day", "agenda"]}
			{...props}
		/>
	);
}

export default EventCalendar;

/* 
  Docs: http://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page
  Video: https://www.youtube.com/watch?v=ZFhDJAOd9Tg&t=1s
*/
