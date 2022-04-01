import { useDispatch } from 'react-redux';
import { quoteSlice } from '../state/quoteSlice';

export const useQuote = () => {
  const dispatch = useDispatch();

  const getQuote = async (symbol: string) => {
    try {
      dispatch(quoteSlice.actions.setLoader());

      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`);

      const data = await response.json();

      dispatch(quoteSlice.actions.setData(data));

    } catch {
      dispatch(quoteSlice.actions.setError('Stock not found'));
    }
  };

  return {
    getQuote,
  };
};
