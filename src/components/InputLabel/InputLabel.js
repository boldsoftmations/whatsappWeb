// InputLabel.js

import React from "react";
import PropTypes from "prop-types";
import styles from "./InputLabel.module.css";

const InputLabel = React.memo(({ label, name, type, value, onChange }) => {
  return (
    <div className={styles["input-label-container"]}>
      <label htmlFor={name} className={styles["input-label"]}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles["input-field"]}
      />
    </div>
  );
});

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputLabel;
