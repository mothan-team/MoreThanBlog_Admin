import React, { Fragment } from "react";
import { Button, Row, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/Auth/auth.types";

import "./index.less";

const FormItem = Form.Item;

const Login = (props) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleOk = (values) => {
    dispatch({ type: LOGIN, payload: values });
  };

  const errors = ["Asdf"];

  return (
    <Fragment>
      <div className="form">
        <div className="logo">
          <img alt="logo" src="https://morethanblog.tk/asset/logo.png" />
          <span>Mỏ than</span>
        </div>
        <Form onFinish={handleOk} form={form}>
          <FormItem name="email" rules={[{ required: true }]} hasFeedback>
            <Input placeholder="Email" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true }]} hasFeedback className="mt-3">
            <Input type="password" placeholder="Password" />
          </FormItem>
          <Form.ErrorList errors={errors} />
          <Row>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign in
            </Button>
            <p>
              <span style={{ marginRight: 20 }}>Username morethan.team@yopmail.com</span>
              <span>Password : abcd@1234</span>
            </p>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default Login;
