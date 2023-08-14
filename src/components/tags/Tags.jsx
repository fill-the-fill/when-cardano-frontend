import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Tags from "../../data/Tags";

// Every individual Tag Box
const TagBox = ({ tag, isActive, onClick }) => (
  <div
    className={`tag-box ${isActive ? "active" : ""}`}
    style={{
      width: "100%",
      border: isActive ? "1px solid #3788d8" : "1px solid #a4a6a8",
      alignItems: "center",
      borderRadius: "4px",
      cursor: "pointer",
      display: "flex",
      lineHeight: "1.5",
      opacity: ".85",
      padding: "0.275rem 0.8rem",
      transition: "opacity .2s ease-out",
    }}
    onClick={() => onClick(tag.label)}
  >
    {tag.label}
    <span
      style={{
        backgroundColor: tag.color,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        marginLeft: "8px",
      }}
    ></span>
  </div>
);

// Handle every tag click
const TagSelection = ({ activeTags, setActiveTags, onTagFilter }) => {
  const handleTagClick = (tagKey) => {
    setActiveTags((prevActiveTags) => {
      if (prevActiveTags.includes(tagKey)) {
        return prevActiveTags.filter((tag) => tag !== tagKey);
      } else {
        return [...prevActiveTags, tagKey];
      }
    });
  };

  // Call the onTagFilter function whenever activeTags change
  useEffect(() => {
    onTagFilter(activeTags);
  }, [activeTags]);

  return (
    <Grid container spacing={2}>
      {Object.keys(Tags).map((tagKey, key) => (
        <Grid item xs={3} key={key}>
          <TagBox
            tag={Tags[tagKey]}
            isActive={activeTags.includes(tagKey)}
            onClick={() => handleTagClick(tagKey)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TagSelection;
