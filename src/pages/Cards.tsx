import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import History from '../components/History/History';
import Divider from '../components/Divider/Divider';
import Typography from '@mui/material/Typography';

const Cards: React.FC = () => (
  <Layout>
    <Divider />
    <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
      Cards
    </Typography>
    <Card
      number="5244 2150 8252 ****"
      cvcNumber="824"
      validUntil="10 / 30"
      cardHolder="CENK SARI"
    />
    <Divider />
    <History detailed date="May 6" dateBalance="-€127.78" />
    <Divider />
  </Layout>
);

export default Cards;
