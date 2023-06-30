import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  // Add new event states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startValue, setStartValue] = useState(dayjs("2022-04-07"));
  const [endValue, setEndValue] = useState(dayjs("2022-04-07"));
  const [eventType, setEventType] = useState("local");
  const [success, setSuccess] = useState(0);

  const isButtonDisabled =
    title === "" ||
    description === "" ||
    startValue === "" ||
    endValue === "" ||
    eventType === "";

  const handleClose = () => {
    props.setNewOpenEvent(false);
    setSuccess(0);
  };

  const handleFormSubmit = async (e) => {
    const token = process.env.REACT_APP_GITHUB_TOKEN; // Replace with your own token
    const repoOwner = process.env.REACT_APP_GITHUB_NAME;
    const repoName = process.env.REACT_APP_REPO_NAME;

    // Generate a unique branch name based on timestamp
    const branchName = `branch-${Date.now()}`;

    try {
      // Get response of the main branch
      const mainBranchResponse = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mainBranchSHA = mainBranchResponse.data.object.sha;

      // Create new branch for pull request
      await axios.post(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`,
        {
          ref: `refs/heads/${branchName}`,
          sha: mainBranchSHA,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get existing data from main
      const existingDataResponse = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/database.json`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const existingDataContent = decodeURIComponent(
        window.atob(existingDataResponse.data.content)
      );

      const existingData = JSON.parse(existingDataContent);

      // Create object of new data
      const newData = {
        id: (existingData.database.length + 1).toString(),
        title: title,
        color: eventType === "virtual" ? "#0538af" : "#2AA18A",
        location: eventType,
        description: description,
        start: startValue,
        end: endValue,
      };

      existingData.database.push(newData);

      const updatedContent = window.btoa(JSON.stringify(existingData, null, 2));

      // Create pull request data
      await axios.put(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/database.json`,
        {
          message: title + " - Add to calendar",
          content: updatedContent,
          sha: existingDataResponse.data.sha,
          branch: branchName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create pull request data
      const pullRequestResponse = await axios.post(
        `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
        {
          title: title + " - Add to calendar",
          body: "Please review and merge this pull request.",
          head: branchName,
          base: "main",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Pull Request created successfully:",
        pullRequestResponse.data.html_url
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error creating Pull Request:", error);
      setSuccess(false);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    console.log(";)");
  }, [success]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Suggest new event
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                id="event-title"
                label="Even Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                multiline
                label="Even Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Event Start"
                  value={startValue}
                  onChange={(newValue) => {
                    setStartValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Event End"
                  value={endValue}
                  onChange={(newValue) => {
                    setEndValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={(e) =>
                      setEventType(e.target.checked ? "local" : "virtual")
                    }
                  />
                }
                label="Local or Virtual?"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div>
            {success === true
              ? "pr submitted"
              : success === false
              ? "pr failed to submit"
              : null}
          </div>
          <Button onClick={handleFormSubmit} disabled={isButtonDisabled}>
            Submit Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
