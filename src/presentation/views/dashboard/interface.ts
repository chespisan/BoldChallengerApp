import { ChangeEvent, ChangeEventHandler, ReactNode } from "react";

import { ITab } from "app/presentation/components/tabs/interface";
import { IStateFilter } from "app/presentation/containers/dashboard/interface";
import { ICheckboxGroup } from "app/presentation/components/checkbox/interface";

export interface IDashboardView {
  children: ReactNode;
}

export interface IFilters {
  totalSales: number;
  getSelectedTap: (tab: ITab) => void;
  tabs: ITab[];
  stateFilters: IStateFilter;
  isOpenFilters: boolean;
  openFilters: () => void;
  onChange: (value: string) => void;
  checkboxGroup: ICheckboxGroup[];
  filterByCheckboxGroup: () => void;
}
