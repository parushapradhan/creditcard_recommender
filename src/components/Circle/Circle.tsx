import Box from '@mui/material/Box';

interface IProps {
  icon: string;
  color: string;
}

const colorMap: Record<string, string> = {
  purple: '#8852f6',
  yellow: '#ffca0c',
  orange: '#ff571d',
  gray: '#3e4649',
  red: '#f42d53',
  blue: '#0a56ea',
  green: '#4ed34e',
};

const Circle: React.FC<IProps> = ({ icon, color }) => (
  <Box
    sx={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      bgcolor: colorMap[color] || '#9e9e9e',
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
