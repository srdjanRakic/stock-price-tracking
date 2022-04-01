import { AsyncData } from '../../store/AsyncData';
import { Company } from '../types/Company';

export type CompanyState = {
  companyInfo: AsyncData<Company>;
};
