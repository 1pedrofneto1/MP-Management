import styles from "./Input.module.css";
import { NumericFormat } from "react-number-format";

const Input = ({
  type,
  text,
  name,
  placeholder,
  handlerOnChange,
  value,
  isCurrency,
}) => {
  return (
    <>
      {isCurrency ? (
        <div className={styles.form_control}>
          <label htmlFor={name}>{text}:</label>
          <NumericFormat
            type="text"
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handlerOnChange}
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
          />
        </div>
      ) : (
        <div className={styles.form_control}>
          <label htmlFor={name}>{text}:</label>
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handlerOnChange}
            value={value}
          />
        </div>
      )}
    </>
  );
};

export default Input;
