// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ message }) => {
  return <div className="bg-red-500 text-white p-2 rounded">{message}</div>;
};

export default ErrorMessage;
