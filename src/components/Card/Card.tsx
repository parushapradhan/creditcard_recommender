import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';

interface IProps {
  number: string;
  cvcNumber: string;
  validUntil: string;
  cardHolder: string;
}

const Card: React.FC<IProps> = ({ number, cvcNumber, validUntil, cardHolder }) => (
  <Box sx={{ mb: 2 }}>
    <MuiCard
      sx={{
        background: '#000',
        color: '#fff',
        p: 3,
        borderRadius: 3,
        mb: 2,
        border: '1px solid #555',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25), 0 8px 40px rgba(0,0,0,0.15)',
      }}
    >
      <Typography variant="overline" sx={{ opacity: 0.7 }}>
        CARD NUMBER
      </Typography>
      <Typography variant="h6" sx={{ letterSpacing: 2, my: 1 }}>
        {number}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>CARD HOLDER</Typography>
          <Typography variant="body2">{cardHolder}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>VALID UNTIL</Typography>
          <Typography variant="body2">{validUntil}</Typography>
        </Box>
      </Box>
    </MuiCard>
    {/* <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Typography variant="caption" color="text.secondary">Balance</Typography>
        <Typography variant="body1">€ 783.45</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Typography variant="caption" color="text.secondary">Limit</Typography>
        <Typography variant="body1">€ 1250.00</Typography>
      </Box>
    </Box> */}
  </Box>
);

export default Card;
