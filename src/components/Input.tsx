import { FieldHookConfig, useField } from "formik";
import React from "react";

const Input: React.FC<FieldHookConfig<string>> = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} placeholder={props.placeholder} type={props.type} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
