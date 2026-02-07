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
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ReactCreditCards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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

function toExpiry(validUntil: string): string {
  const m = validUntil.replace(/\s/g, '').match(/(\d{1,2})\/?(\d{2,4})?/);
  if (!m) return '••/••';
  const mm = m[1].padStart(2, '0');
  const yy = (m[2] || '••').length === 4 ? (m[2] as string).slice(-2) : (m[2] || '••');
  return `${mm}/${yy}`;
}

const INITIAL_CARDS: CardItem[] = [
  { number: '4244 2150 8252 1234', cvcNumber: '824', validUntil: '10 / 30', cardHolder: 'CENK SARI' },
  { number: '4532 1489 3301 5678', cvcNumber: '291', validUntil: '03 / 28', cardHolder: 'CENK SARI' },
  { number: '4550 9234 1108 9012', cvcNumber: '556', validUntil: '08 / 29', cardHolder: 'CENK SARI' },
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
      <Box sx={{ width: '100%', py: 1 }}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          loop={cards.length > 1}
          pagination={{ clickable: true }}
          className="cards-carousel"
          style={{ paddingBottom: 48 }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={`${card.number}-${index}`}>
              <Box sx={{ display: 'flex', justifyContent: 'center', px: 1 }}>
                <Box sx={{ maxWidth: 380, width: '100%' }}>
                  <ReactCreditCards
                    number={card.number.replace(/\s/g, '')}
                    expiry={toExpiry(card.validUntil)}
                    cvc={card.cvcNumber}
                    name={card.cardHolder}
                    issuer="visa"
                    preview
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mt: 2,
          px: 0,
          py: 1,
          bgcolor: 'grey.800',
          borderRadius: 9999,
          border: 'none',
        }}
        component="form"
        onSubmit={(e) => e.preventDefault()}
      >
        <IconButton sx={{ color: 'white', ml: 0.5 }} aria-label="Add">
          <AddIcon />
        </IconButton>
        <Box
          component="input"
          placeholder="Ask anything"
          type="text"
          sx={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            color: 'white',
            fontSize: '1rem',
            py: 1.25,
            '&::placeholder': { color: 'grey.500' },
            '&:focus': { outline: 'none' },
          }}
        />
        <IconButton sx={{ color: 'white' }} aria-label="Voice input">
          <MicIcon />
        </IconButton>
        <IconButton
          sx={{
            color: 'black',
            bgcolor: 'white',
            mr: 0.5,
            '&:hover': { bgcolor: 'grey.200' },
          }}
          aria-label="Send"
        >
          <GraphicEqIcon />
        </IconButton>
      </Box>
      <Divider />
    </Layout>
  );
};

export default Cards;
