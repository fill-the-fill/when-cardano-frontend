import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Tags from "../../data/Tags";

// Every individual Tag Box
const TagBox = ({ tag, isActive, onClick }) => (
  <div
    className={`tag-box ${isActive ? "active" : ""}`}
    style={{
      backgroundColor: tag.color,
      width: "100%",
      border: isActive ? "2px solid red" : "2px solid transparent",
    }}
    onClick={() => onClick(tag.label)}
  >
    {tag.label}
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

    // Call the onTagFilter function with the updated activeTags
    onTagFilter(activeTags);
  };

  // Call the onTagFilter function whenever activeTags change
  useEffect(() => {
    onTagFilter(activeTags);
  }, [activeTags, onTagFilter]);

  return (
    <Grid container spacing={2}>
      {Object.keys(Tags).map((tagKey) => (
        <Grid item xs={3}>
          <TagBox
            key={tagKey}
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
