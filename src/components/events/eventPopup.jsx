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
  const endDate = props.event._instance.range.start;

  const formatedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formatedEndDate = moment(endDate).format("YYYY-MM-DD");

  const formatedStartTime = moment(startDate).format("HH:mm");
  const formatedEndTime = moment(endDate).format("HH:mm");

  const handleClose = () => {
    props.setOpenEvent(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.event._def.title}
        </DialogTitle>
        <DialogContent>
          Event type: {props.event._def.extendedProps.location}
          <DialogContentText>
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
