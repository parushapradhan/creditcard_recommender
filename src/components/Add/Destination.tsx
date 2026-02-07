import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Destination: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      p: 2,
      border: 1,
      borderColor: 'divider',
      borderRadius: 2,
    }}
  >
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body1">EURO</Typography>
        <ExpandMoreIcon fontSize="small" />
      </Box>
      <Typography variant="caption" color="text.secondary">
        Balance: € 231.40
      </Typography>
    </Box>
    <Box sx={{ textAlign: 'right' }}>
      <TextField
        size="small"
        placeholder="0"
        defaultValue="0"
        inputProps={{ style: { textAlign: 'right' } }}
        sx={{ width: 120 }}
      />
      <Typography variant="caption" color="text.secondary" display="block">
        No fee
      </Typography>
    </Box>
  </Box>
);

export default Destination;
