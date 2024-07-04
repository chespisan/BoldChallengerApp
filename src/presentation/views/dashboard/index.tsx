import { HeaderComponent, TabsComponent } from "app/presentation/components";

import { IDashboardView } from "app/presentation/views/dashboard/interface";
import styles from "app/presentation/views/dashboard/dashboard.module.scss";

export const DashboardView = ({ getSelectedTap }: IDashboardView) => {
  return (
    <div className={styles["dashboard"]}>
      <HeaderComponent />

      <div className={styles["dashboard__section-filters-info"]}>
        <div className={styles["dashboard__total-sales"]}>
          <p className={styles["dashboard__title-sales"]}>
            Total de ventas de Junio
          </p>
          <div className={styles["dashboard__info-sales"]}>
            <p className={styles["dashboard__amount-sales"]}>$394.561.894</p>
            <p>Junio, 2024</p>
          </div>
        </div>
        <div className={styles["dashboard__filters"]}>
          <TabsComponent
            tabs={[
              {
                id: 1,
                title: "Hoy",
                value: "today",
                selected: false,
              },
              {
                id: 2,
                title: "Esta semana",
                value: "week",
                selected: false,
              },
              {
                id: 3,
                title: "Junio",
                value: "month",
                selected: true,
              },
            ]}
            getSelectedTap={getSelectedTap}
          />
        </div>
      </div>

      {/* Table */}
    </div>
  );
};
