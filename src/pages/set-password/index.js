import React, { useEffect } from "react";
import { Button, Row, Input, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import bg from "../../assets/login-background.json";
import { passwordValidation } from '../../utils/validation';
import { SET_PASS, RESET_STATE } from "../../redux/Password/password.types";

import "./index.less";

const FormItem = Form.Item;

const SetPassword = () => {
    const [form] = Form.useForm();
    const { otp, email } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const loading = useSelector((state) => state.password.loading);
    const error = useSelector((state) => state.password.error);
    const isSucess = useSelector((state) => state.password.isSuccess);

    useEffect(() => {
        if (isSucess) {
            Modal.success({
                content: "Set password success!",
                onOk() {
                    history.push("/authenticate/login");
                }
            });
        }
        return (() => {
            dispatch({ type: RESET_STATE });
        })
    }, [isSucess, history, dispatch]);

    useEffect(() => {
        if (error) {
            Modal.error({
                title: 'Error',
                content: error,
            });
        }
    }, [error]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: bg,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleOk = (values) => {
        dispatch({
            type: SET_PASS, payload: {
                request: {
                    otp: otp,
                    email: email,
                    newPassword: values.password,
                    confirmPassword: values.confirmPassword
                },
            }
        });
    };

    return (
        <div className="set-pass-container">
            <div className="lottie-bg">
                <Lottie options={defaultOptions} />
            </div>
            <div className="form">
                <div className="logo">
                    <img alt="logo" src="https://morethanblog.tk/asset/logo.png" />
                </div>
                <div className="title">Create new password</div>
                <div className="desc">Password must contain at least 8 characters with a mix of letters, numbers & symbols</div>
                <Form onFinish={handleOk} form={form}>
                    <FormItem
                        name="password"
                        rules={passwordValidation.password}
                        hasFeedback>
                        <Input type="password" placeholder="Enter the password" />
                    </FormItem>
                    <FormItem
                        name="confirmPassword"
                        rules={passwordValidation.confirmPassword}
                        hasFeedback
                        className="mt-3">
                        <Input type="password" placeholder="Confirm the password" />
                    </FormItem>
                    <Row>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Create
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default SetPassword;
