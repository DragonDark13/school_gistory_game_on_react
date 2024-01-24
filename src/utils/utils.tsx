import {Typography} from "@mui/material";
import React from "react";
import {IArticleContentArrayItem} from "../types/types";


export const contentRenderFunction = (content: IArticleContentArrayItem[] | string) => {

    console.log('content', content);

    let loremIpismText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n" +
        "                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n" +
        "                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\n" +
        "                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n" +
        "                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    if (content) {
        if (typeof content === "object" && content.length > 0) {
            return content.map((item, index: number) => (
                <Typography className={(item.type && item.type === "title") ? "title" : "text"}
                            variant={(item.type && item.type === "title") ? "h6" : "body1"} key={index}>{item.text}</Typography>
            ));

        } else if (typeof content === "string") {
            return <Typography>{content}</Typography>
        }
    } else {
        return <Typography>{loremIpismText}</Typography>
    }


}
