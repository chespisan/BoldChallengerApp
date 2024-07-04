"use client";

import { DashboardView } from "app/presentation/views";
import { ITab } from "app/presentation/components/tabs/interface";

export const DashboardContainer = () => {
  const getSelectedTap = (tap: ITab) => {
    console.log("Tap-container: ", tap);
  };

  return <DashboardView getSelectedTap={getSelectedTap} />;
};
