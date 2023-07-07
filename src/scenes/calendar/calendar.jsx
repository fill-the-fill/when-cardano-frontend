import React, { useEffect, useState, useRef } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import "./calendar.css";
import axios from "axios";
import { colorDesign } from "../../theme";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/header/Header";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { github_database } from "../../constants/constants";
import ExistingEventPopup from "../../components/events/eventPopup";
import NewEventPopup from "../../components/addEvents/addEventPopup";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const Calendar = () => {
  const theme = useTheme();
  const calendarRef = useRef(null);
  const colors = colorDesign(theme.palette.mode);
  const [allEvents, setAllEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

  // Popup state for existing event
  const [openEvent, setOpenEvent] = useState(false);
  // Popup state for new event
  const [openNewEvent, setNewOpenEvent] = useState(false);
  // Selected event for popup
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Open existing event function
  const handleEventClick = (selected) => {
    const clickedEvent = selected.event;
    setSelectedEvent(clickedEvent);
    setOpenEvent(true);
  };

  // Load calendar
  const handleCalendarLoad = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEventSources();
  };

  // Handle adding new event
  const handleAddEventClick = (selected) => {
    const clickedEvent = selected.event;
    setSelectedEvent(clickedEvent);
    setNewOpenEvent(true);
  };

  // Load all events
  useEffect(() => {
    const getBufferContentAsync = async () => {
      try {
        const response = await axios.get(github_database);
        console.log(response.data);
        setAllEvents(response.data.database);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBufferContentAsync();
  }, []);

  return (
    <Box m="20px">
      <Header title="Cardano Event Calendar" subtitle="Calendar" />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[900]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            All Events
          </Typography>
          <List>
            {currentEvents.map((event, key) => (
              <ListItem
                key={key}
                sx={{
                  backgroundColor: "#3788d8",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  sx={{ color: "#FFFFFF" }}
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* CALENDAR */}
        {allEvents.length && (
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                momentTimezonePlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              timeZone="local"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              ref={calendarRef} // Pass the ref to FullCalendar
              events={allEvents}
              onLoad={handleCalendarLoad}
              select={handleAddEventClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
            />
            {selectedEvent && (
              <ExistingEventPopup
                open={openEvent}
                event={selectedEvent}
                setOpenEvent={setOpenEvent}
                onClose={() => setOpenEvent(false)}
              />
            )}
            <NewEventPopup
              open={openNewEvent}
              event={selectedEvent}
              setNewOpenEvent={setNewOpenEvent}
              onClose={() => setNewOpenEvent(false)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Calendar;
