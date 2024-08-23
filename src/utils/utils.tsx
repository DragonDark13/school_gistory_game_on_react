import { Typography } from "@mui/material";
import React from "react";
import { IArticleContentArrayItem } from "../types/types";

// Функція для рендерингу контенту
export const contentRenderFunction = (content: IArticleContentArrayItem[] | string) => {
    const loremIpismText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    if (typeof content === "object" && content.length > 0) {
        return content.map((item, index) => (
            <Typography
                className={item.type === "title" ? "title" : "text"}
                variant={item.type === "title" ? "h6" : "body1"}
                key={index}
            >
                {item.text}
            </Typography>
        ));
    }

    return <Typography>{typeof content === "string" ? content : loremIpismText}</Typography>;
};

// Налаштування для валідації
export const validateSettings = {
    password: {
        min: 8,
        max: 20,
        passwordPattern: /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}/,
    },
    email: {
        min: 3,
        max: 254,
        emailPattern: /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    username: {
        min: 6,
        max: 20,
        usernamePattern: /^[a-zA-Z0-9_]{6,20}$/, // Латинські букви, цифри та підкреслення, довжина від 6 до 20 символів
    },
};

// Функція для валідації email
export const validateEmail = (
    email: string,
    setEmailErrorText: (text: string) => void,
    setEmailErrorState: (state: boolean) => void
): boolean => {
    const emailLengthValid = email.length >= validateSettings.email.min && email.length <= validateSettings.email.max;
    const localPart = email.split('@')[0];
    const localPartValid = localPart.length <= 64;
    const formatValid = validateSettings.email.emailPattern.test(email);
    const invalidDotPattern = /(^\.)|(\.\.)|(\.$)/;
    const dotsValid = !invalidDotPattern.test(localPart);

    if (email === "" || !emailLengthValid || !formatValid || !localPartValid || !dotsValid) {
        setEmailErrorState(true);
        if (email === "") {
            setEmailErrorText("Please enter your email");
        } else if (!emailLengthValid) {
            setEmailErrorText(`Email should be between ${validateSettings.email.min} and ${validateSettings.email.max} characters`);
        } else if (!localPartValid) {
            setEmailErrorText("The local part of the email should be up to 64 characters");
        } else if (!formatValid) {
            setEmailErrorText("Please enter a valid email");
        } else {
            setEmailErrorText("Email should not start or end with a dot and should not contain consecutive dots");
        }
        return false;
    }

    setEmailErrorState(false);
    return true;
};

// Функція для валідації пароля
export const validatePassword = (
    password: string,
    setPasswordErrorText: (text: string) => void,
    setPasswordErrorState: (state: boolean) => void
): boolean => {
    const passwordLengthValid = password.length >= validateSettings.password.min && password.length <= validateSettings.password.max;
    const formatValid = validateSettings.password.passwordPattern.test(password);

    if (!formatValid) {
        setPasswordErrorText("Password must contain at least one uppercase letter, one digit, one special character, and only Latin letters, digits, and special characters (!@#$%^&*).");
        setPasswordErrorState(true);
        return false;
    } else if (!passwordLengthValid) {
        setPasswordErrorText(`Password should be between ${validateSettings.password.min} and ${validateSettings.password.max} characters`);
        setPasswordErrorState(true);
        return false;
    }

    setPasswordErrorState(false);
    return true;
};

// Функція для валідації імені користувача
export const validateUsername = (
    userName: string,
    setUserNameErrorText: (text: string) => void,
    setUserNameErrorState: (state: boolean) => void
): boolean => {
    const usernameLengthValid = userName.length >= validateSettings.username.min && userName.length <= validateSettings.username.max;
    const formatValid = validateSettings.username.usernamePattern.test(userName);

    if (!formatValid || !usernameLengthValid) {
        setUserNameErrorState(true);
        if (userName === "") {
            setUserNameErrorText("Please enter your username");
        } else if (!usernameLengthValid) {
            setUserNameErrorText(`Username should be between ${validateSettings.username.min} and ${validateSettings.username.max} characters`);
        } else {
            setUserNameErrorText("Username must be between 6 and 20 characters long and can only contain Latin letters, digits, and underscores.");
        }
        return false;
    }

    setUserNameErrorState(false);
    return true;
};
