import { FC } from "react";
import styles from "./LoadingSpinner.module.css";
const LoadingSpinner: FC = () => {
  return (
    <div className="bg-grayPrimary min-h-screen flex justify-center items-center">
      <div className={styles.ldsGrid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
