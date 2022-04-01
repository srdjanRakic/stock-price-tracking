import { QuoteState } from '../Quote/state/QuoteState';
import { CompanyState } from '../Quote/state/CompanyState';

export type RootState = {
  quote: QuoteState;
  company: CompanyState;
};
