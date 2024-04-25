import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomAccordion = ({ user }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  

  return (
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1bh-content"
           id="panel1bh-header"
         >
           <Typography sx={{ width: '33%', flexShrink: 0 }}>{user.username}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {user.chats.map((chat, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {`${chat.sender}: ${chat.text}`}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
      
  );
};

export default CustomAccordion;
