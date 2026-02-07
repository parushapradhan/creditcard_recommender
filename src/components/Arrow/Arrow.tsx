import Box from '@mui/material/Box';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Arrow: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: 'action.selected',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ArrowDownwardIcon color="action" />
    </Box>
  </Box>
);

export default Arrow;
