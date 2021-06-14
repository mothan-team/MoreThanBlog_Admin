import { Result } from "antd";
import React from "react";

const Error = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      style={{ paddingTop: 100 }}
    />
  );
};

export default Error;
