import { ITab } from "app/presentation/components/tabs/interface";

export interface IDashboardView {
  getSelectedTap?: (tab: ITab) => void;
}
