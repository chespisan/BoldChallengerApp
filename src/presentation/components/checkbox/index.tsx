import { ChangeEvent } from "react";

import { ICheckbox } from "app/presentation/components/checkbox/interface";

import styles from "app/presentation/components/checkbox/checkbox.module.scss";

export const CheckboxComponent = ({ checkboxGroup, onChange }: ICheckbox) => {
  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles["radio-container"]}>
      {checkboxGroup.map((radio) => (
        <div key={radio.id} className={styles["radio-container__group"]}>
          <label className={styles["radio-container__radio-label"]}>
            <input
              className={styles["radio-container__radio"]}
              type="checkbox"
              checked={radio.checked}
              name={radio.value}
              id={radio.value}
              value={radio.value}
              onChange={onValueChange}
            />
            {radio.label}
          </label>
        </div>
      ))}
    </div>
  );
};
