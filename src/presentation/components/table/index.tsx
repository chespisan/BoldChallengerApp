import Image from "next/image";
import { useState } from "react";

import { TransactionEntity } from "app/domain";
import { ITableComponent } from "app/presentation/components/table/interface";
import { formatCurrency, formatDate } from "app/presentation/utils";

import CHECK from "/public/check.svg";
import REJECT from "/public/transaction-reject.svg";
import SUCCESS from "/public/transaction-success.svg";
import PSE from "/public/pse.svg";
import DAVIPLATA from "/public/daviplata.svg";
import BANCOLOMBIA from "/public/bancolombia.svg";
import NEQUI from "/public/nequi.svg";
import VISA from "/public/visa.svg";
import MASTERCARD from "/public/mastercard-icon.svg";
import SEARCH from "/public/search.svg";

import styles from "app/presentation/components/table/table.module.scss";

export const TableComponent = ({
  stateFilters,
  transactions,
  searchInputValue,
  onChange,
}: ITableComponent) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentTransition, setCurrentTransition] =
    useState<TransactionEntity>();

  const createTextPaymentMethod = (transaction: TransactionEntity) => {
    const listPaymentMethod = [
      {
        id: 1,
        name: "PSE",
        icon: PSE,
        text: "PSE",
      },
      {
        id: 2,
        name: "DAVIPLATA",
        icon: DAVIPLATA,
        text: `*** ${transaction.transactionReference}`,
      },
      {
        id: 3,
        name: "BANCOLOMBIA",
        icon: BANCOLOMBIA,
        text: `*** ${transaction.transactionReference}`,
      },
      {
        id: 4,
        name: "NEQUI",
        icon: NEQUI,
        text: "NEQUI",
      },
      {
        id: 5,
        name: "VISA",
        icon: VISA,
        text: `*** ${transaction.transactionReference}`,
      },
      {
        id: 6,
        name: "MASTERCARD",
        icon: MASTERCARD,
        text: `*** ${transaction.transactionReference}`,
      },
    ];
    const findMethod = listPaymentMethod.find((item) => {
      if (transaction.paymentMethod === "CARD") {
        if (item.name === transaction?.franchise) {
          return item;
        }
      }
      if (item.name === transaction.paymentMethod) {
        return item;
      }
    });

    return (
      <div className={styles["table-container__payment-method"]}>
        <Image
          className={styles["dashboard__icon-info"]}
          src={findMethod?.icon}
          alt="Bold - Info"
          unoptimized
          width={32}
          height={32}
        />
        <p>{findMethod?.text}</p>
      </div>
    );
  };

  const shoModal = (transition: TransactionEntity) => {
    setOpenModal(true);
    setCurrentTransition(transition);
  };

  return (
    <>
      <div
        className={`
        ${styles["modal-detail-transaction"]}
        ${openModal ? styles["modal-detail-transaction--open"] : ""}
      `}
      >
        <div className={styles["modal-detail-transaction__sidebar"]}>
          <div
            className={styles["modal-detail-transaction__close"]}
            onClick={() => setOpenModal(false)}
          >
            <p>X</p>
          </div>

          <div className={styles["modal-detail-transaction__header"]}>
            <Image
              src={CHECK}
              alt="Bold - Info"
              unoptimized
              width={60}
              height={60}
            />
            <p className={styles["modal-detail-transaction__header-text"]}>
              {currentTransition?.status === "SUCCESSFULL"
                ? "¡Cobro exitoso!"
                : "¡Cobro no realizado!"}
            </p>
            <p className={styles["modal-detail-transaction__header-amount"]}>
              {formatCurrency(currentTransition?.amount!)}
            </p>
            <p className={styles["modal-detail-transaction__header-date"]}>
              {currentTransition?.createdAt &&
                formatDate(currentTransition?.createdAt)}
            </p>
          </div>

          <div className={styles["modal-detail-transaction__detail"]}>
            <div className={styles["modal-detail-transaction__info-detail"]}>
              <p className={styles["modal-detail-transaction__info-key"]}>
                ID transacción Bold
              </p>
              <p className={styles["modal-detail-transaction__info-value"]}>
                {currentTransition?.id}
              </p>
            </div>

            <div className={styles["modal-detail-transaction__info-detail"]}>
              <p className={styles["modal-detail-transaction__info-key"]}>
                Deducción Bold
              </p>
              <p className={styles["modal-detail-transaction__info-deduction"]}>
                {currentTransition?.deduction
                  ? `-${formatCurrency(currentTransition?.deduction)}`
                  : ""}
              </p>
            </div>

            <hr />
            <div className={styles["modal-detail-transaction__info-detail"]}>
              <p className={styles["modal-detail-transaction__info-key"]}>
                Método de pago
              </p>
              <p className={styles["modal-detail-transaction__info-value"]}>
                {currentTransition &&
                  createTextPaymentMethod(currentTransition)}
              </p>
            </div>
            <div className={styles["modal-detail-transaction__info-detail"]}>
              <p className={styles["modal-detail-transaction__info-key"]}>
                Tipo de pago
              </p>
              <div className={styles["modal-detail-transaction__info-value"]}>
                {currentTransition?.salesType === "PAYMENT_LINK" ? (
                  <div
                    className={styles["modal-detail-transaction__info-icon"]}
                  >
                    <Image
                      src={REJECT}
                      alt="Bold - Info"
                      unoptimized
                      width={20}
                      height={20}
                    />
                    Link de pagos
                  </div>
                ) : (
                  <div
                    className={styles["modal-detail-transaction__info-icon"]}
                  >
                    <Image
                      src={SUCCESS}
                      alt="Bold - Info"
                      unoptimized
                      width={20}
                      height={20}
                    />
                    Datafono
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["table-container"]}>
        <div className={styles["table-container__table"]}>
          <div className={styles["table-container__table-title"]}>
            <p>Tus ventas de {stateFilters.text}</p>
          </div>

          <div className={styles["table-container__table-search"]}>
            <Image
              className={styles["dashboard__icon-info"]}
              src={SEARCH}
              alt="Bold - Info"
              unoptimized
              width={20}
              height={20}
            />
            <input
              className={styles["table-container__input-search"]}
              type="text"
              placeholder="Buscar"
              value={searchInputValue}
              onChange={onChange}
            />
          </div>

          <div className={styles["table-container__table-header"]}>
            <p className={styles["table-container__header-t1"]}>Transacción</p>
            <p className={styles["table-container__header-t2"]}>Fecha y Hora</p>
            <p className={styles["table-container__header-t3"]}>
              Método de pago
            </p>
            <p className={styles["table-container__header-t4"]}>
              ID transacción Bold
            </p>
            <p className={styles["table-container__header-t5"]}>Monto</p>
          </div>

          {transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className={styles["table-container__table-row"]}
              onClick={() => shoModal(transaction)}
            >
              <div className={styles["table-container__row-f1"]}>
                {transaction.status === "SUCCESSFUL" ? (
                  <Image
                    className={styles["dashboard__icon-info"]}
                    src={SUCCESS}
                    alt="Bold - Info"
                    unoptimized
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    className={styles["dashboard__icon-info"]}
                    src={REJECT}
                    alt="Bold - Info"
                    unoptimized
                    width={20}
                    height={20}
                  />
                )}
                <p>
                  {transaction.status === "SUCCESSFUL"
                    ? "Cobro exitoso"
                    : "Cobro no realizado"}
                </p>
              </div>
              <p className={styles["table-container__row-f2"]}>
                {formatDate(
                  transaction.createdAt,
                  stateFilters.dateFilter === "day" ? true : false
                )}
              </p>
              <p className={styles["table-container__row-f3"]}>
                {createTextPaymentMethod(transaction)}
              </p>
              <p className={styles["table-container__row-f4"]}>
                {transaction.id}
              </p>
              <div className={styles["table-container__row-f5"]}>
                <p className={styles["table-container__row-amount"]}>
                  {formatCurrency(transaction.amount)}
                </p>
                {transaction.deduction ? (
                  <>
                    <p className={styles["table-container__row-deduction"]}>
                      Deducción Bold
                    </p>
                    <p
                      className={styles["table-container__row-deduction-value"]}
                    >
                      -{formatCurrency(transaction.deduction)}
                    </p>{" "}
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
