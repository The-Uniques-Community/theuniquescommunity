import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';

const ChatbotLink = ({ student, SectionHeading }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        border: '1px solid #eee',
        background: 'linear-gradient(180deg, #ffffff 0%, #faf7f7 100%)'
      }}
    >
      <SectionHeading variant="h5">Chat With {student.name}</SectionHeading>
      <Typography variant="body1" sx={{ maxWidth: '720px', color: '#4a4a4a', mt: 1, mb: 3 }}>
        Ask {student.name} about their journey, skills, and the decisions that shaped their success.
        This chatbot is built to share insights and guidance in their voice.
      </Typography>

      {student.chatbotUrl ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={handleOpen}
            sx={{
              bgcolor: '#ca0019',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.2,
              borderRadius: 2,
              '&:hover': { bgcolor: '#a50014' }
            }}
          >
            Open {student.name}'s Chatbot
          </Button>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Tip: You can ask about projects, career choices, or advice for beginners.
          </Typography>
        </Box>
      ) : (
        <Typography color="text.secondary">Chatbot link will be available soon.</Typography>
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
    </Paper>
  );
};

export default ChatbotLink;
