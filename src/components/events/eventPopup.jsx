import React from "react";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { AddToCalendarButton } from "add-to-calendar-button-react";

export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const startDate = props.event._instance.range.start;
  const endDate = props.event._instance.range.end;

  const formatedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formatedEndDate = moment(endDate).format("YYYY-MM-DD");

  const formatedStartTime = moment(startDate).format("HH:mm");
  const formatedEndTime = moment(endDate).format("HH:mm");

  const handleClose = () => {
    props.setOpenEvent(false);
  };

  const TagBox = ({ tag }) => (
    <div
      style={{
        width: "30%",
        border: "1px solid #a4a6a8",
        alignItems: "center",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        lineHeight: "1.5",
        opacity: ".85",
        padding: "0.275rem 0.8rem",
        transition: "opacity .2s ease-out",
      }}
    >
      {tag}
      <span
        style={{
          backgroundColor: "red",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          marginLeft: "8px",
        }}
      ></span>
    </div>
  );

  const MappedTags = () => {
    return props.event._def.extendedProps.tags.map((tag, key) => {
       return <TagBox tag={tag} key={key} />;
    });
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ fontSize: 25 }}>
          {props.event._def.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {console.log(props.event)}
            {/* Event type: {props.event._def.extendedProps.location} */}
            Tags: <MappedTags/>
            {props.event._def.extendedProps.description}
            Description: {props.event._def.extendedProps.description}
          </DialogContentText>
          <AddToCalendarButton
            name={props.event._def.title}
            options={["Apple", "Google"]}
            location="World Wide Web"
            startDate={formatedStartDate}
            endDate={formatedEndDate}
            startTime={formatedStartTime}
            endTime={formatedEndTime}
            timeZone="Europe/Riga"
            description={props.event._def.extendedProps.description}
          ></AddToCalendarButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
