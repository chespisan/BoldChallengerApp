import Image from "next/image";

import {
  CheckboxComponent,
  HeaderComponent,
  TableComponent,
  TabsComponent,
} from "app/presentation/components";

import {
  IDashboardView,
  IFilters,
} from "app/presentation/views/dashboard/interface";
import { ITableComponent } from "app/presentation/components/table/interface";
import { formatCurrency } from "app/presentation/utils";

import styles from "app/presentation/views/dashboard/dashboard.module.scss";

import iconInfo from "/public/info.svg";

export const DashboardView = ({ children }: IDashboardView) => {
  return <div className={styles["dashboard"]}>{children}</div>;
};
const Header = () => <HeaderComponent />;

const Filters = ({
  isOpenFilters,
  openFilters,
  getSelectedTap,
  filterByCheckboxGroup,
  checkboxGroup,
  onChange,
  stateFilters,
  tabs,
  totalSales,
}: IFilters) => (
  <div className={styles["dashboard__section-filters-info"]}>
    <div className={styles["dashboard__total-sales"]}>
      <div className={styles["dashboard__title-sales"]}>
        <p>Total de ventas de {stateFilters.text}</p>
        <div className={styles["dashboard__tooltip"]}>
          <span className={styles["dashboard__tooltiptext"]}>
            Estas son el total de ventas de {stateFilters.text}
          </span>
          <Image
            className={styles["dashboard__icon-info"]}
            src={iconInfo}
            alt="Bold - Info"
            unoptimized
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className={styles["dashboard__info-sales"]}>
        <p className={styles["dashboard__amount-sales"]}>
          {formatCurrency(totalSales)}
        </p>
        <p>{stateFilters.textTotalSales}</p>
      </div>
    </div>
    <div className={styles["dashboard__filters-box"]}>
      <TabsComponent tabs={tabs} getSelectedTap={getSelectedTap} />

      <div className={styles["dashboard__filters"]}>
        <div
          className={styles["dashboard__filters-action"]}
          onClick={openFilters}
        >
          <p>Filtrar</p>
        </div>
        <div
          className={`
            ${styles["dashboard__modal-filters"]}
            ${isOpenFilters ? styles["dashboard__modal-filter--open"] : ""}
          `}
        >
          <div className={styles["dashboard__filters-header"]}>
            <p>Filtrar</p>
            <p
              className={styles["dashboard__icon-close"]}
              onClick={openFilters}
            >
              X
            </p>
          </div>
          <div className={styles["dashboard__radio-content"]}>
            <CheckboxComponent
              checkboxGroup={checkboxGroup}
              onChange={onChange}
            />
          </div>
          <button
            className={styles["dashboard__filter-action"]}
            onClick={filterByCheckboxGroup}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Table = ({ ...props }: ITableComponent) => <TableComponent {...props} />;

DashboardView.Header = Header;
DashboardView.Filters = Filters;
DashboardView.Table = Table;
