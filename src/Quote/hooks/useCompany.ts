import { useDispatch } from 'react-redux';
import { companySlice } from '../state/quoteSlice';

export const useCompany = () => {
  const dispatch = useDispatch();

  const getCompanyInfo = async (symbol: string) => {
    try {
      dispatch(companySlice.actions.setLoader());

      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${process.env.REACT_APP_IEX_API_KEY}`);

      const data = await response.json();

      dispatch(companySlice.actions.setData(data));

    } catch {
      dispatch(companySlice.actions.setError("Unable to fetch company info"));
    }
  };

  return {
    getCompanyInfo
  };
};
