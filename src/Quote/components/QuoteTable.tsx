import * as React from 'react';

// hooks
import { useSelector } from 'react-redux';

// types
import { Quote } from '../types/Quote';
import { RootState } from '../../store/RootState';

// components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface RowProps {
  quote: Quote | null
}

function Row(props: RowProps ) {
  const { quote } = props;

  const [open, setOpen] = React.useState(false);

  const companyInfo = useSelector((state: RootState) => state.company.companyInfo);

  if (!quote) return null;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            data-testid="toggleRow"
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {quote.symbol}
        </TableCell>
        <TableCell align="right">{quote.companyName}</TableCell>
        <TableCell align="right">{quote.latestPrice}</TableCell>
        <TableCell align="right">{quote.changePercent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {companyInfo.loading && <CircularProgress />}
              {companyInfo.error && <Alert severity="error">{companyInfo.error}</Alert>}
              {companyInfo.data &&
                <>
                  <Typography variant="h6" gutterBottom component="div">
                    Details
                  </Typography>
                  <Typography gutterBottom component="p">
                  {companyInfo.data.description || 'No description available'}
                  </Typography>
                </>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props {
  data: Quote;
}

export default function QuoteTable({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Company name</TableCell>
            <TableCell align="right">Current stock price</TableCell>
            <TableCell align="right">Today’s change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && <Row key={data?.symbol} quote={data} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
