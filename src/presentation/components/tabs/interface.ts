export interface ITab {
  id: number;
  title: string;
  value: string;
  selected: boolean;
}

export interface ITabs {
  tabs: ITab[];
  getSelectedTap?: (tab: ITab) => void;
}
