/**
 * @file ChatbotLink.jsx
 * @description Floating interactive AI chatbot trigger and modal dialog embedded within individual student success profiles.
 * @architecture Sub-component loaded into `StudentStory.jsx` (`src/views/Landing/SuccessStories/StudentStory.jsx`). Conditionally renders an interactive floating action button and iframe modal when `student.chatbotUrl` is present on the fetched story record.
 * @agent_note Relies on `student.chatbotUrl` populated by `The-Uniques-Portal/server/models/community/successStoryModel.js` and returned via `GET ${BASE_URL}/api/success-stories/:id`. If `chatbotUrl` is empty or undefined, this component safely renders null without breaking layout flow.
 */

import React, { useState } from 'react';
import { Box, Typography, Dialog, IconButton, Button } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';

/**
 * @component ChatbotLink
 * @description Renders a floating avatar/chat trigger button that opens an embedded iframe modal with the student's personal conversational agent.
 * @param {Object} props - Component properties
 * @param {Object} props.student - Candidate data record
 * @param {string} props.student.name - Student's full name
 * @param {string} [props.student.chatbotUrl] - Hosted URL of the candidate's interactive portfolio chatbot
 * @returns {JSX.Element|null} The floating chatbot trigger button and dialog modal.
 * @state {boolean} open - Controls visibility of the chatbot iframe modal dialog
 * @api Interacts with external chatbot endpoint loaded within iframe.
 */
const ChatbotLink = ({ student }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {student.chatbotUrl && (
        <Box
          sx={{
            position: 'fixed',
            right: { xs: 16, md: 24 },
            bottom: { xs: 16, md: 24 },
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              bgcolor: '#ca0019',
              color: '#fff',
              px: 2,
              py: 1,
              borderRadius: 999,
              fontWeight: 600,
              boxShadow: '0 10px 25px rgba(202, 0, 25, 0.3)'
            }}
          >
            Hey, I'm {student.name}.
          </Box>
          <Button
            onClick={handleOpen}
            aria-label={`Open ${student.name}'s chatbot`}
            sx={{
              minWidth: 56,
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: '#ca0019',
              color: '#fff',
              boxShadow: '0 12px 24px rgba(202, 0, 25, 0.35)',
              '&:hover': { bgcolor: '#a50014' }
            }}
          >
            <ChatBubbleOutlineIcon />
          </Button>
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: { xs: 2, md: 3 },
              py: { xs: 1.5, md: 2 },
              bgcolor: '#ca0019',
              color: '#fff'
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Hey, I'm {student.name} — ask me what you want to know.
            </Typography>
            <IconButton
              onClick={handleClose}
              aria-label="Close"
              sx={{
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.35)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            component="iframe"
            title={`${student.name} Chatbot`}
            src={student.chatbotUrl}
            sx={{
              width: '100%',
              height: { xs: 520, md: 600 },
              border: 0,
              display: 'block',
              backgroundColor: '#fff'
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default ChatbotLink;
