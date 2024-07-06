import { TransactionEntity } from "app/domain";
import { IStateFilter } from "app/presentation/containers/dashboard/interface";
import { ChangeEvent } from "react";

export interface ITableComponent {
  transactions?: TransactionEntity[];
  stateFilters: IStateFilter;
  searchInputValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
