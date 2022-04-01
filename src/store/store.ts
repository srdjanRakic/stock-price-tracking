import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { RootState } from './RootState';
import { quoteSlice} from '../Quote/state/quoteSlice';
import { companySlice } from '../Quote/state/companySlice';

const reducer = combineReducers<RootState>({
  quote: quoteSlice.reducer,
  company: companySlice.reducer
});

export const store = configureStore({
  reducer
});
