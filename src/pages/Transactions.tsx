import Typography from '@mui/material/Typography';
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';

const Transactions: React.FC = () => (
  <Layout>
    <Divider />
    <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
      Transactions
    </Typography>
    <History detailed date="May 6" dateBalance="-€127.78" />
    <Divider />
    <History detailed date="May 5" dateBalance="-€970.23" />
    <Divider />
  </Layout>
);

export default Transactions;
