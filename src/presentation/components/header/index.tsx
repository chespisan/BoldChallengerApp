import styles from "app/presentation/components/header/header.module.scss";

export const HeaderComponent = () => {
  return (
    <div className={styles["header"]}>
      <div className={styles["header__menu"]}>
        <p className={styles["header__text"]}>Mi negocio</p>
        <p className={styles["header__text"]}>Ayuda ?</p>
      </div>
    </div>
  );
};
