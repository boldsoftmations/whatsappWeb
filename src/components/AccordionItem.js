import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = ({ message }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Helper function to determine if the URL is for an image, PDF, or video
  const fileLink = (url) => {
    if (!url) return "None";
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileType = pathname
      .substring(pathname.lastIndexOf(".") + 1)
      .toLowerCase();

    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return `Image: ${url}`;
      case "pdf":
        return `PDF Document: ${url}`;
      case "mp4":
      case "avi":
      case "mov":
        return `Video: ${url}`;
      default:
        return `File: ${url}`;
    }
  };

  return (
    <Accordion
      sx={{ backgroundColor: "#ffffff" }}
      expanded={expanded === `panel${message.id}`}
      onChange={handleChange(`panel${message.id}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${message.id}-content`}
        id={`panel${message.id}-header`}
      >
        <Typography sx={{ flexShrink: 0 }}>
          (ID: {message.id}) Email: {message.email}, Contact: {message.number}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#ffffff" }}>
        {message.image && (
          <Typography variant="body2" color="text.secondary">
            <Link href={message.image} target="_blank" rel="noopener">
              {fileLink(message.image)}
            </Link>
          </Typography>
        )}
        {message.document && (
          <Typography variant="body2" color="text.secondary">
            <Link href={message.document} target="_blank" rel="noopener">
              {fileLink(message.document)}
            </Link>
          </Typography>
        )}
        {message.message && (
          <Typography variant="body2" color="text.secondary">
            Message: {message.message}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Creation Date: {message.creation_date}
        </Typography>
        {message.caption && (
          <Typography variant="body2" color="text.secondary">
            Caption: {message.caption}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Message Statistics: Sent: {message.messages_statistics.sent}, Queue:{" "}
          {message.messages_statistics.queue}, Unsent:{" "}
          {message.messages_statistics.unsent}, Invalid:{" "}
          {message.messages_statistics.invalid}
        </Typography>
        {/* Additional message details can be added here */}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
