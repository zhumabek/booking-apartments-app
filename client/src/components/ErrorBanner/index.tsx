import React from "react";
import { Alert } from "antd";
import {AlertProps} from "antd/es/alert";

interface Props {
  message?: string;
  description?: string;
  type?: AlertProps["type"];
}

export const ErrorBanner = ({
  message = "Uh oh! Something went wrong :(",
  description = "Look like something went wrong. Please check your connection and/or try again later.",
  type = "error"
}: Props) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type={type}
      className="error-banner"
    />
  );
};
