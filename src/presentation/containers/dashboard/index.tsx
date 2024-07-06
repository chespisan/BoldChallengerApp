"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { TransactionEntity } from "app/domain";
import { DashboardView } from "app/presentation/views";
import {
  ICheckboxGroup,
  IDashboardContainer,
  IFiltersModal,
  IStateFilter,
} from "app/presentation/containers/dashboard/interface";
import { ITab } from "app/presentation/components/tabs/interface";
import { useDebouncedValue } from "app/presentation/hooks";

const filters: IFiltersModal = {
  dataphones: [],
  links: [],
};

export const DashboardContainer = ({ data }: IDashboardContainer) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<IStateFilter>({
    dateFilter: "",
    text: "",
    textTotalSales: "",
  });
  const [transactions, setTransactions] = useState<TransactionEntity[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [isOpenFilters, setOpenFilters] = useState<boolean>(false);
  const [tabs] = useState<ITab[]>([
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
  ]);
  const [checkboxGroup, setCheckboxGroup] = useState<ICheckboxGroup[]>([
    {
      id: 1,
      label: "Cobro con datáfono",
      value: "dataphone",
      checked: false,
    },
    {
      id: 2,
      label: "Cobro con link de pago",
      value: "link",
      checked: false,
    },
    {
      id: 3,
      label: "Ver todos",
      value: "all",
      checked: false,
    },
  ]);

  const debouncedLat = useDebouncedValue(inputValue, 1000);

  const openFilters = () => {
    if (isOpenFilters) {
      const checkboxGroupOff = checkboxGroup.map((checkbox) => {
        return { ...checkbox, checked: false };
      });
      setCheckboxGroup(checkboxGroupOff);
    }
    setOpenFilters(!isOpenFilters);
  };

  const setTtotalSales = (transitions: TransactionEntity[]) => {
    transitions.forEach((transaction) => {
      setTotalSales((prevTotal) => (prevTotal += transaction.amount));
    });
  };

  const filterByMonth = (array: TransactionEntity[], month: number) => {
    return array.filter((el) => {
      const date = new Date(el.createdAt);
      const mnt = date.getMonth() + 1;
      return mnt === month;
    });
  };

  const filterByWeek = (array: TransactionEntity[]) => {
    const aWeek = 604800000;
    const currentDate = new Date().getTime();
    const diff = currentDate - aWeek;

    return array.filter((el: TransactionEntity) => {
      if (diff <= el.createdAt && el.createdAt <= currentDate) {
        return el;
      }
    });
  };

  const filterByDay = (array: TransactionEntity[]) => {
    const currentDate = new Date().getTime();
    const diff = currentDate - 86400000;

    return array.filter((el: TransactionEntity) => {
      if (diff <= el.createdAt && el.createdAt <= currentDate) {
        return el;
      }
    });
  };

  const filterByInputSearch = (text: string) => {
    if (transactions.length === 0) return;
    if (text === "") {
      setTransactions(data!);
      return;
    }

    const filtered = transactions.filter((elem) => {
      const formattext = text.toLocaleUpperCase().trim();
      if (formattext === "COBRO EXITOSO") {
        return elem.status === "SUCCESSFUL";
      }
      if (formattext === "COBRO NO REALIZADO") {
        return elem.status === "REJECTED";
      }
      return (
        elem.id === formattext ||
        elem.paymentMethod === formattext ||
        elem?.franchise === formattext
      );
    });
    setTransactions(filtered);
  };

  const filterByCheckboxGroup = (checks?: ICheckboxGroup[]) => {
    let checksOn = [];

    if (checks && Array.isArray(checks)) {
      checksOn = checks.filter((elem) => elem.checked === true);
    } else {
      checksOn = checkboxGroup.filter((elem) => elem.checked === true);
    }

    let totalFilters: TransactionEntity[] = [];
    filters.dataphones = [];
    filters.links = [];

    checksOn.forEach((elem) => {
      if (elem.value === "all") {
        totalFilters = [...data!];
        return;
      }
      if (elem.value === "dataphone") {
        filters.dataphones = data!.filter(
          (transaction) => transaction.salesType === "TERMINAL"
        );
      }
      if (elem.value === "link") {
        filters.links = data!.filter(
          (transaction) => transaction.salesType === "PAYMENT_LINK"
        );
      }
    });

    if (totalFilters.length) {
      setTransactions(data!);
      setTotalSales(0);
      setTtotalSales(totalFilters);
      localStorage.setItem("checboxGroup", JSON.stringify(checkboxGroup));
      openFilters();
      return;
    }

    totalFilters = [...filters.dataphones, ...filters.links];

    if (totalFilters.length === 0) {
      localStorage.clear();
      initData(3);
      openFilters();
      return;
    }

    setTransactions(totalFilters);
    setTotalSales(0);
    setTtotalSales(totalFilters);
    localStorage.setItem("checboxGroup", JSON.stringify(checkboxGroup));
    openFilters();
  };

  const getSelectedTap = (tabSelected: ITab) => {
    const value =
      tabSelected.value === "month" ? 3 : tabSelected.value === "week" ? 2 : 1;
    initData(value);
  };

  const setFilterData = (state: number) => {
    let day = "";
    if (state === 1) {
      const date = new Date();
      const options: any = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      day = date.toLocaleString("es-CO", options);
    }

    setStateFilter({
      dateFilter: state === 3 ? "month" : state === 2 ? "week" : "day",
      text: state === 3 ? "Junio" : state === 2 ? "esta semana" : "hoy",
      textTotalSales:
        state === 3 ? "Junio, 2024" : state === 2 ? "Última semana" : day,
    });
  };

  const onChanceCheckboxFilters = (value: string) => {
    const newChecboxGroup = checkboxGroup.map((radio) => {
      if (radio.value === value) {
        return { ...radio, checked: !radio.checked };
      }
      return radio;
    });
    setCheckboxGroup(newChecboxGroup);
  };

  const onChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const initData = (state: number) => {
    setTotalSales(0);

    let response: TransactionEntity[] = [];
    setFilterData(state);

    switch (state) {
      case 1:
        response = filterByDay(data!);
        console.log("response: ", response);
        setTransactions(response);
        break;
      case 2:
        response = filterByWeek(data!);
        setTransactions(response);
        break;
      case 3:
        response = filterByMonth(data!, 6);
        setTransactions(response);
        break;
      default:
        response = filterByMonth(data!, 6);
        setTransactions(response);
        break;
    }
    setTtotalSales(response);
  };

  const verifyDataLocalStorage = () => {
    const getChecksOn = localStorage.getItem("checboxGroup");
    if (getChecksOn) {
      const currentChecks: ICheckboxGroup[] = JSON.parse(getChecksOn);
      currentChecks.forEach((check) => {
        checkboxGroup.forEach((radio) => {
          if (radio.value === check.value) {
            radio.checked = check.checked;
          }
        });
      });
      setCheckboxGroup(checkboxGroup);
      checkboxGroup && filterByCheckboxGroup(JSON.parse(getChecksOn));
      return;
    }
    initData(3);
  };

  useEffect(() => {
    verifyDataLocalStorage();
  }, []);

  useEffect(() => {
    filterByInputSearch(inputValue);
  }, [debouncedLat]);

  return (
    <DashboardView>
      <DashboardView.Header />
      <DashboardView.Filters
        isOpenFilters={isOpenFilters}
        getSelectedTap={getSelectedTap}
        openFilters={openFilters}
        filterByCheckboxGroup={filterByCheckboxGroup}
        checkboxGroup={checkboxGroup}
        onChange={onChanceCheckboxFilters}
        stateFilters={stateFilter}
        tabs={tabs}
        totalSales={totalSales}
      />
      <DashboardView.Table
        searchInputValue={inputValue}
        onChange={onChangeInputSearch}
        transactions={transactions}
        stateFilters={stateFilter}
      />
    </DashboardView>
  );
};
