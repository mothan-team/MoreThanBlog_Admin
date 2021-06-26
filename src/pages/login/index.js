import React, { useEffect } from "react";
import { Button, Row, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../../redux/Auth/auth.types";
import Lottie from "react-lottie";
import bg from "../../assets/login-background.json";

import "./index.less";

const FormItem = Form.Item;

const Login = (props) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOk = (values) => {
    dispatch({ type: LOGIN, payload: { request: values, history } });
  };

  useEffect(() => {
    switch (error) {
      case "User Not Found":
        form.setFields([{ name: "email", errors: ["User Not Found"] }]);
        break;
      case "Wrong Password":
        form.setFields([{ name: "password", errors: ["Wrong Password"] }]);
        break;

      default:
        break;
    }
  }, [error, form]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="login-container">
      <div className="lottie-bg">
        <Lottie options={defaultOptions} />
      </div>
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
    </div>
  );
};

export default Login;
