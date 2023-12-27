import {Typography} from "@mui/material";
import React from "react";


export const contentRenderFunction = (content: object[] | string) => {

    let loremIpismText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n" +
        "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n" +
        "                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n" +
        "                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n" +
        "                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    if (typeof content === "object" && content.length > 0) {
        return content.map(({text, type}, index: number) => (
            <Typography className={(type && type === "title") ? "title" : "text"}
                        variant={(type && type === "title") ? "h6" : "body1"} key={index}>{text}</Typography>
        ));

    } else if (typeof content === "string") {
        return <Typography>{content}</Typography>
    } else {
        return <Typography>{loremIpismText}</Typography>
    }


}
