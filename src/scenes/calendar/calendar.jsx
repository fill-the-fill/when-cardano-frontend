import React, { useState, useRef } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import "./calendar.css";
import { colorDesign } from "../../theme";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/header/Header";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import ExistingEventPopup from "../../components/events/EventPopup";
import NewEventPopup from "../../components/addEvents/AddEvent";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Database } from "../../data/Database";
import TagSelection from "../../components/tags/Tags";

const Calendar = () => {
  const theme = useTheme();
  const calendarRef = useRef(null);
  const colors = colorDesign(theme.palette.mode);

  // Filtered events
  const [filteredEvents, setFilteredEvents] = useState([]);
  // Current events
  const [currentEvents, setCurrentEvents] = useState([]);
  // Active tags
  const [activeTags, setActiveTags] = useState([]);
  // Initial mode is 'ALL'
  const [toggleMode, setToggleMode] = useState("allTags");
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

  // Handle filtering by tag
  const handleTagFilter = (tags, mode) => {
    if (tags.length === 0) {
      setFilteredEvents(Database); // Display all events
    } else {
      const filteredEvents = Database.filter((event) => {
        if (mode === "allTags") {
          return tags.some((tag) => event.tags.includes(tag));
        } else if (mode === "orTags") {
          return tags.every((tag) => event.tags.includes(tag));
        }
      });
      setFilteredEvents(filteredEvents);
    }
  };

  // Handle switching ALL/OR toggle
  const handleToggleModeChange = (mode) => {
    setToggleMode(mode);
    handleTagFilter(activeTags, mode);
  };

  return (
    <Box m="20px">
      <Header title="Cardano Event Calendar" />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: "1rem" }}
      >
        <TagSelection
          activeTags={activeTags}
          setActiveTags={setActiveTags}
          onTagFilter={(tags) => handleTagFilter(tags, toggleMode)} // Pass toggleMode
        />
        <ButtonGroup>
          <Button
            variant={toggleMode === "allTags" ? "contained" : "outlined"}
            onClick={() => handleToggleModeChange("allTags")}
          >
            ALL
          </Button>
          <Button
            variant={toggleMode === "orTags" ? "contained" : "outlined"}
            onClick={() => handleToggleModeChange("orTags")}
          >
            OR
          </Button>
        </ButtonGroup>
      </Box>
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
            selectable={false} // Should be true if submitting PRs
            selectMirror={true}
            dayMaxEvents={true}
            ref={calendarRef} // Pass the ref to FullCalendar
            events={activeTags.length ? filteredEvents : Database}
            // onLoad={handleCalendarLoad}
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
      </Box>
    </Box>
  );
};

export default Calendar;
