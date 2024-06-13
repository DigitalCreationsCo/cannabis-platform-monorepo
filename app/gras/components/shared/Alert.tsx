import React from 'react';
import { Alert as AlertCore, type AlertProps } from 'react-daisyui';

const Alert = (props: AlertProps) => {
  const { children, className, ...rest } = props;

  return (
    <AlertCore {...rest} className={`${className} rounded px-4 py-3`}>
      {children}
    </AlertCore>
  );
};

export default Alert;
