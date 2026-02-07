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
      bgcolor: active ? 'primary.main' : 'background.paper',
      '&:hover': { bgcolor: active ? 'primary.dark' : 'action.hover' },
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: active ? 'primary.contrastText' : 'action.selected',
        color: active ? 'primary.main' : 'text.secondary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 2,
      }}
    >
      {children}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1">{name}</Typography>
      <Typography variant="caption" color="text.secondary">{shortName}</Typography>
    </Box>
    <Typography variant="body2" fontWeight="500">
      {aer}
    </Typography>
  </Paper>
);

export default Currency;
