import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#fff',
  p: 4,
  borderRadius: 2,
};

export default function sModal(props) {
  const { open, setOpen, content } = props;

  const handleClose = () => setOpen(false);

  return (
    <div style={{ zIndex: '9999' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '.css-7355d1-MuiBackdrop-root-MuiModal-backdrop': {
            background: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box sx={style}>
          {content || (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
