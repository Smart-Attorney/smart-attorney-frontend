import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Event } from "react-big-calendar";
import { CalendarWhite } from "../assets/smart-attorney-figma/sidebar";
import EventCalendar from "../features/calendar/EventCalendar";
import { getUserCaseFolders } from "../features/calendar/api/get-case-folders";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import { CalendarDeadlines } from "../services/mock-sql/schemas";
import { Format } from "../utils/format";

function Calendar() {
	const [events, setEvents] = useState<Event[]>();

	useEffect(() => {
		handleGetCaseDeadlines();
	}, []);

	const handleGetCaseDeadlines = async () => {
		try {
			const response = await getUserCaseFolders();
			if (response.ok) {
				const data: CalendarDeadlines[] = await response.json();
				const deadlines: Event[] = [];
				for (let i = 0, n = data.length; i < n; i++) {
					const stringDate = Format.dateForInputDisplay(data[i].deadline);
					deadlines.push({
						start: dayjs(stringDate).toDate(),
						end: dayjs(stringDate).toDate(),
						title: data[i].folder_name,
					});
				}
				setEvents(deadlines);
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<SidebarLayout>
			<PageHeader className="gap-2">
				<img className="w-10" src={CalendarWhite} />
				<h1 className="text-3xl font-bold text-white ">Calendar</h1>
			</PageHeader>
			<EventCalendar events={events} />
		</SidebarLayout>
	);
}

export default Calendar;
