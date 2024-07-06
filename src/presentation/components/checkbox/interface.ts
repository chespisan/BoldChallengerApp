import { ChangeEvent } from "react";

export interface ICheckboxGroup {
  id: number;
  label: string;
  value: string;
  checked: boolean;
}

export interface ICheckbox {
  checkboxGroup: ICheckboxGroup[];
  onChange: (value: string) => void;
}
