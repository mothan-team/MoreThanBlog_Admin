import { PASSWORD_PATTERN, EMAIL_PATTERN } from '../constants/common';

export const passwordValidation = {
    password: [
        {
            required: true,
            message: "Password is required",
        },
        {
            pattern: PASSWORD_PATTERN,
            message: "Password must contain at least 8 characters with a mix of letters, numbers & symbols",
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: "Confirm password is required",
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(
                    "Password not match"
                );
            },
        }),
    ],
};

export const emailValidation = {
    email: [
        {
            required: true,
            message: "Email is required",
        },
        {
            pattern: EMAIL_PATTERN,
            message: "Email is invalid",
        },
    ]
}

export const codeValidation = {
    verifyCode: [
        {
            required: true,
            message: "verify code is required",
        }
    ]
}