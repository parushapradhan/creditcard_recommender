import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import Currency from '../components/Currency/Currency';

const Savings: React.FC = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <Layout>
      <Divider />
      <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
        Savings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Annual Equivalent Rate or AER, is used to show what you would earn in interest over a year.
        Please select a currency in the list.
      </Typography>
      <Divider />
      <Box sx={{ mb: 2 }}>
        <Currency
          aer="2.29% AER"
          name="British Pound"
          shortName="GBP"
          active={selected === 'GBP'}
          onSelect={() => setSelected('GBP')}
        >
          £
        </Currency>
        <Currency
          aer="1.49% AER"
          name="US Dollar"
          shortName="USD"
          active={selected === 'USD'}
          onSelect={() => setSelected('USD')}
        >
          $
        </Currency>
        <Currency
          aer="1.19% AER"
          name="Euro"
          shortName="EUR"
          active={selected === 'EUR'}
          onSelect={() => setSelected('EUR')}
        >
          €
        </Currency>
      </Box>
      <Divider />
      <Button
        variant="contained"
        fullWidth
        disabled={selected === ''}
      >
        Continue
      </Button>
      <Divider />
    </Layout>
  );
};

export default Savings;
