import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Event } from "react-big-calendar";
import { CalendarWhite } from "../assets/smart-attorney-figma/sidebar";
import EventCalendar from "../features/calendar/EventCalendar";
import { getUserDocuments } from "../features/calendar/api/get-document-deadlines";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import { DateUtils } from "../utils/date-utils";
import { Document } from "../types/api";

function Calendar() {
	const [events, setEvents] = useState<Event[]>();

	useEffect(() => {
		getDocumentDeadlines();
	}, []);

	const getDocumentDeadlines = async () => {
		try {
			const response = await getUserDocuments();
			if (response.ok) {
				const data: Document[] = await response.json();
				const deadlines: Event[] = [];
				for (let i = 0, n = data.length; i < n; i++) {
					const stringDate = DateUtils.formatToYMD(data[i].deadline);
					deadlines.push({
						start: dayjs(stringDate).toDate(),
						end: dayjs(stringDate).toDate(),
						title: data[i].name,
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
