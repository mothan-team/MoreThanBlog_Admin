import React, { Fragment } from "react";
import { Button, Row, Input, Form } from "antd";

import "./index.less";

const FormItem = Form.Item;

const Login = (props) => {
  const { dispatch, loading } = props;

  const handleOk = (values) => {
    dispatch({ type: "login/login", payload: values });
  };

  return (
    <Fragment>
      <div className="form">
        <div className="logo">
          <img alt="logo" src="https://morethanblog.tk/asset/logo.png" />
          <span>Mỏ than</span>
        </div>
        <Form onFinish={handleOk}>
          <FormItem name="username" rules={[{ required: true }]} hasFeedback>
            <Input placeholder="Username" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true }]} hasFeedback>
            <Input type="password" placeholder="Password" />
          </FormItem>
          <Row>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign in
            </Button>
            <p>
              <span className="mr-4">Username ：guest</span>
              <span>Password ：guest</span>
            </p>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default Login;
