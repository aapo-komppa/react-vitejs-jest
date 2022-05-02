import { FieldHookConfig, useField } from "formik";
import React from "react";

const Input: React.FC<FieldHookConfig<string>> = ({ className, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} className={className} placeholder={props.placeholder} type={props.type} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
