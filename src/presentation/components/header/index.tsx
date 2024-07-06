import Image from "next/image";

import iconLogo from "/public/Bold-logo.svg";

import styles from "app/presentation/components/header/header.module.scss";

export const HeaderComponent = () => {
  return (
    <div className={styles["header"]}>
      <Image
        src={iconLogo}
        alt="Bold - Logo"
        unoptimized
        width={120}
        height={120}
      />
      <div className={styles["header__menu"]}>
        <p className={styles["header__text"]}>Mi negocio</p>
        <p className={styles["header__text"]}>Ayuda ?</p>
      </div>
    </div>
  );
};
