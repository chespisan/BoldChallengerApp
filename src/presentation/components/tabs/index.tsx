import { useEffect, useState } from "react";

import { ITabs, ITab } from "app/presentation/components/tabs/interface";
import styles from "app/presentation/components/tabs/tabs.module.scss";

export const TabsComponent = ({ tabs, getSelectedTap }: ITabs) => {
  const [currentTabs, setCurrentTabs] = useState<ITab[]>();

  const selectTab = (tabIndex: number) => {
    const updateTabs = tabs.map((tab) => {
      tab.selected = false;
      if (tab.id === tabIndex) {
        tab.selected = true;
        getSelectedTap && getSelectedTap(tab);
      }
      return tab;
    });
    setCurrentTabs(updateTabs);
  };

  useEffect(() => {
    setCurrentTabs(tabs);
  }, [tabs]);

  return (
    <div className={styles["tabs"]}>
      {currentTabs?.map((tab) => (
        <p
          key={tab.id}
          className={`
                ${styles["tabs__tab"]}
                ${tab.selected ? styles["tabs__tab--selected"] : ""}
                `}
          onClick={() => selectTab(tab.id)}
        >
          {tab.title}
        </p>
      ))}
    </div>
  );
};
