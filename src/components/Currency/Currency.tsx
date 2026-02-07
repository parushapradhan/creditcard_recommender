import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface IProps {
  aer: string;
  name: string;
  active?: boolean;
  shortName: string;
  children: React.ReactNode;
  onSelect: () => void;
}

const Currency: React.FC<IProps> = ({
  aer,
  name,
  shortName,
  children,
  active = false,
  onSelect,
}) => (
  <Paper
    variant="outlined"
    onClick={onSelect}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    sx={{
      display: 'flex',
      alignItems: 'center',
      p: 2,
      mb: 1,
      cursor: 'pointer',
      borderColor: active ? 'primary.main' : 'divider',
      borderWidth: active ? 2 : 1,
      bgcolor: active ? 'grey.100' : 'background.paper',
      '&:hover': { bgcolor: 'grey.50' },
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 3,
        bgcolor: active ? 'primary.main' : 'grey.300',
        color: active ? 'primary.contrastText' : 'text.secondary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 2,
        fontSize: '1.25rem',
      }}
    >
      {children}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" color="text.primary">{name}</Typography>
      <Typography variant="caption" color="text.secondary">{shortName}</Typography>
    </Box>
    <Typography variant="body2" fontWeight="500" color="text.primary">
      {aer}
    </Typography>
  </Paper>
);

export default Currency;
