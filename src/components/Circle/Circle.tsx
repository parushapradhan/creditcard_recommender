import Box from '@mui/material/Box';

interface IProps {
  icon: string;
  color: string;
}

const colorMap: Record<string, string> = {
  purple: '#616161',
  yellow: '#9e9e9e',
  orange: '#757575',
  gray: '#9e9e9e',
  red: '#616161',
  blue: '#424242',
  green: '#757575',
};

const Circle: React.FC<IProps> = ({ icon, color }) => (
  <Box
    sx={{
      width: 48,
      height: 48,
      borderRadius: 3,
      bgcolor: colorMap[color] ?? '#9e9e9e',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .material-symbols-outlined': { fontSize: 24 },
    }}
  >
    <span className="material-symbols-outlined">{icon}</span>
  </Box>
);

export default Circle;
