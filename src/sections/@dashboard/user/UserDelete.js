import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import Axios from '../../../api/axios';

const btnWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const URL = '/api/v1/patient/list';

export default function UserDelete() {
  const patient = useSelector((state) => state.patients.selectedPatient);

  const handleDelete = async () => {
    await Axios.delete(`${URL}/${patient.id}`);
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
        <Button variant="contained" color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
