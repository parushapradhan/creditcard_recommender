import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Saved from '../components/Add/Saved';
import Arrow from '../components/Arrow/Arrow';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import Destination from '../components/Add/Destination';

const Add: React.FC = () => (
  <Layout>
    <Divider />
    <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
      Add money
    </Typography>
    <Saved />
    <Arrow />
    <Destination />
    <Divider />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <Button variant="contained" fullWidth>
        Add money securely
      </Button>
    </Box>
    <Divider />
  </Layout>
);

export default Add;
