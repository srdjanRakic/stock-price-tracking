import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

// types
import { RootState } from '../store/RootState';

// hooks
import { useSelector } from 'react-redux';
import { useDebounce } from 'react-use';
import { useQuote } from './hooks/useQuote';
import { useCompany } from './hooks/useCompany';

// components
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import QuoteTable from './components/QuoteTable';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid gray',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export const Quote = () => {
  const { getQuote } = useQuote();
  const { getCompanyInfo } = useCompany();

  const [searchedSymbol, setSearchedSymbol] = React.useState('');

  const quote = useSelector((state: RootState) => state.quote.quote);

  useDebounce(
    async () => {
      if (searchedSymbol) {
        await getQuote(searchedSymbol);
      }
    },
    1000,
    [searchedSymbol]
  );

  React.useEffect(() => {
    async function getCompanyData(symbol: string) {
      await getCompanyInfo(symbol);
    }

    if (quote.data?.symbol) getCompanyData(quote.data?.symbol);
  }, [quote])

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h4" mt={3}>
          Stock tracking
        </Typography>
        <Box paddingTop={3}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              data-testid="stockSearch"
              placeholder="ISIN"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchedSymbol(e.target.value)}
            />
          </Search>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }} mt={3}>
        {quote.loading && <CircularProgress />}
        {quote.error && <Alert severity="error">{quote.error}</Alert>}
        {quote.data && <QuoteTable data={quote.data}></QuoteTable>}
      </Box>
    </Container>
  );
};
