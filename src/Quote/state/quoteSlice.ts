import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncDataInitialState } from '../../store/AsyncData';
import { Quote } from '../types/Quote';
import { Company } from '../types/Company';
import { QuoteState } from './QuoteState';

const initialState: QuoteState = {
  quote: asyncDataInitialState,
  companyInfo: asyncDataInitialState
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Quote>) => {
      state.quote.loading = false;
      state.quote.data = action.payload;
      state.quote.error = '';
    },
    setLoader: (state, action: PayloadAction<boolean | undefined>) => {
      state.quote.loading = action.payload === undefined ? true : action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.quote.loading = false;
      state.quote.error = action.payload;
      state.quote.data = null;
    }
  }
});

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Company>) => {
      state.companyInfo.loading = false;
      state.companyInfo.data = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean | undefined>) => {
      state.companyInfo.loading = action.payload === undefined ? true : action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.companyInfo.loading = false;
      state.companyInfo.error = action.payload;
    }
  }
});
