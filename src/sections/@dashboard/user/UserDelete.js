import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import Axios from '../../../api/axios';

const btnWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const URL = '/api/v1/patient/delete/';

// eslint-disable-next-line react/prop-types
export default function UserDelete({ setDeleteModal }) {
  const patient = useSelector((state) => state.patients.selectedPatient);

  const handleDelete = async () => {
    await Axios.delete(`${URL}${patient.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    })
      .then((res) => {
        console.log(res, 'delete res');
      })
      .catch((err) => {
        console.log(err, 'delete err');
      });
  };

  return (
    <div>
      <h3 style={{ marginBottom: '40px' }}>Do you really want to delete the user?</h3>
      <div style={btnWrapper}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ marginRight: '30px' }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setDeleteModal(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
