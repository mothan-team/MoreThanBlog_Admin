import React, { useEffect, useState } from "react";
import { Button, Input, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import bg from "../../assets/login-background.json";
import { codeValidation, emailValidation, passwordValidation } from '../../utils/validation';
import "./ForgotPass.less";
import ReactCodeInput from 'react-verification-code-input';
import { UPDATE_STEP, GENERATE_OTP, VERIFY_OTP, SET_PASS, RESET_STATE } from "../../redux/Password/password.types";

const FormItem = Form.Item;

const ForgotPass = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const loading = useSelector((state) => state.password.loading);
    const error = useSelector((state) => state.password.error);
    const isSucess = useSelector((state) => state.password.isSuccess);
    const step = useSelector((state) => state.password.step);

    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    useEffect(() => {
        if (isSucess) {
            showSuccessPopup();
        }
        return (() => {
            dispatch({ type: RESET_STATE });
        })
    }, [isSucess]);

    useEffect(() => {
        if (error) {
            Modal.error({
                title: 'Error',
                content: error,
            });
        }
    }, [error]);

    const showSuccessPopup = () => {
        Modal.success({
            content: "Reset password success!",
            onOk() {
                history.push("/authenticate/login");
            }
        });
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: bg,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const nextStep = () => {
        if (step === 1) {
            dispatch({
                type: GENERATE_OTP, payload: {
                    request: {
                        email: email
                    },
                }
            });
        }
        if (step === 2) {
            dispatch({
                type: VERIFY_OTP, payload: {
                    request: {
                        otp: code,
                        email: email
                    },
                }
            });
        }
        if (step === 3) {
            dispatch({
                type: SET_PASS, payload: {
                    request: {
                        otp: code,
                        email: email,
                        newPassword: password,
                        confirmPassword: confirmPassword
                    },
                }
            });
        }
    }

    const backStep = () => {
        if (step > 1) {
            dispatch({ type: UPDATE_STEP, payload: step - 1 });
        }
        else {
            history.push("/authenticate/login");
        }
    }

    return (
        <div className="reset-pass-container">
            <div className="lottie-bg">
                <Lottie options={defaultOptions} />
            </div>
            <div className="form">
                <div className="logo">
                    <img alt="logo" src="https://morethanblog.tk/asset/logo.png" />
                </div>
                <div className="header-tab">
                    <div className={step >= 1 ? "tab tab-finished" : "tab"}></div>
                    <div className={step >= 2 ? "tab tab-finished" : "tab"}></div>
                    <div className={step >= 3 ? "tab tab-finished" : "tab"}></div>
                </div>
                <div className="title">Forgot password</div>
                <div className="desc">{step === 1
                    ? 'Have trouble signing in? Enter your email to get started.'
                    : step === 2
                        ? 'Please enter the verify code'
                        : 'Please enter the new password'}</div>
                <Form onFinish={nextStep} form={form}>
                    <FormItem
                        name="yourEmail"
                        rules={emailValidation.email}
                        hasFeedback
                        hidden={step !== 1}
                        onChange={(e) => setEmail(e.target.value)}>
                        <Input placeholder="Email" />
                    </FormItem>

                    <FormItem
                        name="code"
                        hasFeedback
                        hidden={step !== 2}
                        onChange={(e) => setCode(e.target.value)}
                        rules={step >= 2 ? codeValidation.verifyCode : null}>
                        <ReactCodeInput />
                    </FormItem>

                    <FormItem
                        name="password"
                        rules={step === 3 ? passwordValidation.password : null}
                        hasFeedback
                        hidden={step !== 3}
                        onChange={(e) => setPassword(e.target.value)}>
                        <Input type="password" placeholder="Enter the password" />
                    </FormItem>
                    <FormItem
                        name="confirmPassword"
                        rules={step === 3 ? passwordValidation.confirmPassword : null}
                        hasFeedback
                        className="mt-3"
                        hidden={step !== 3}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                        <Input type="password" placeholder="Confirm the password" />
                    </FormItem>

                    <Form.Item style={{ display: "flex" }} >
                        <Button
                            htmlType="button"
                            className="btn-back-signin"
                            style={{ marginRight: '200px', color: 'white' }}
                            onClick={backStep}>
                            {step === 1 ? 'Back to sign in' : 'Back'}
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {step !== 3 ? 'Next' : 'Submit'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPass;
