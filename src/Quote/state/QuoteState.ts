import { AsyncData } from '../../store/AsyncData';
import { Quote } from '../types/Quote';
import { Company } from '../types/Company';

export type QuoteState = {
  quote: AsyncData<Quote>;
  companyInfo: AsyncData<Company>;
};
