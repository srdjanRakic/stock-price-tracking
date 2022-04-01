import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncDataInitialState } from '../../store/AsyncData';
import { Company } from '../types/Company';
import { CompanyState } from './CompanyState';

const initialState: CompanyState = {
  companyInfo: asyncDataInitialState
};

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
