import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import ScanCardDialog from '../components/ScanCardDialog/ScanCardDialog';
import type { ScannedCardData } from '../components/ScanCardDialog/ScanCardDialog';

export interface CardItem {
  number: string;
  cvcNumber: string;
  validUntil: string;
  cardHolder: string;
}

const INITIAL_CARDS: CardItem[] = [
  { number: '5244 2150 8252 ****', cvcNumber: '824', validUntil: '10 / 30', cardHolder: 'CENK SARI' },
  { number: '5244 2150 8252 ****', cvcNumber: '824', validUntil: '10 / 30', cardHolder: 'CENK SARI' },
  { number: '5244 2150 8252 ****', cvcNumber: '824', validUntil: '10 / 30', cardHolder: 'CENK SARI' },
];

const Cards: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handlePlusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleScanCard = () => {
    handleClose();
    setScanDialogOpen(true);
  };
  const handleAddCardDetails = () => {
    handleClose();
    // TODO: open add card details form
  };

  const handleScanned = (data: ScannedCardData) => {
    setCards((prev) => [
      ...prev,
      {
        number: data.number,
        cvcNumber: data.cvcNumber,
        validUntil: data.validUntil,
        cardHolder: data.cardHolder,
      },
    ]);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="600">
          Cards
        </Typography>
        <IconButton
          onClick={handlePlusClick}
          aria-label="Add card"
          aria-controls={open ? 'add-card-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            border: '2px solid',
            borderColor: 'divider',
            borderRadius: '50%',
            width: 44,
            height: 44,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Menu
        id="add-card-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'add-card-button' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleScanCard}>
          <ListItemIcon>
            <QrCodeScannerIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Scan card</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAddCardDetails}>
          <ListItemIcon>
            <CreditCardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add card details</ListItemText>
        </MenuItem>
      </Menu>
      <ScanCardDialog
        open={scanDialogOpen}
        onClose={() => setScanDialogOpen(false)}
        onScanned={handleScanned}
      />
      <Divider />
      {cards.map((card, index) => (
        <Card
          key={`${card.number}-${index}`}
          number={card.number}
          cvcNumber={card.cvcNumber}
          validUntil={card.validUntil}
          cardHolder={card.cardHolder}
        />
      ))}
      <Divider />
    </Layout>
  );
};

export default Cards;
