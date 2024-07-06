import { TransactionEntity } from "app/domain";

export interface IDashboardContainer {
  data?: TransactionEntity[];
}

export interface IStateFilter {
  dateFilter: string;
  text: string;
  textTotalSales: string;
}

export interface Input {
  event: React.ChangeEvent<HTMLInputElement>;
}

export interface IFiltersModal {
  dataphones: TransactionEntity[];
  links: TransactionEntity[];
}

export interface ICheckboxGroup {
  id: number;
  label: string;
  value: string;
  checked: boolean;
}
