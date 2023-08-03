import { FC } from "react";
import styles from "./LoadingButton.module.css";

interface Props {
  type: 'primary' | 'secondary'
}

const LoadingButton: FC<Props> = (props) => {

 const type = props.type

  return (
    <div className={type === 'primary' ? styles.primary : styles.secondary}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingButton;
