import React from 'react';
import {IMainPageContent} from "../../types/types";
import {Container} from "@mui/material";
import AboutProject from "../AboutProject/AboutProject";
import AboutFeatureList from "../AboutFeatureList/AboutFeatureList";

const MainPageContent = ({
                             handleClickOpenModalSignIn
                         }: IMainPageContent) => {


    return (
        <React.Fragment>

                <div className={"main_page"}>
                    <Container>
                        <AboutProject handleClickOpenModalSignIn={handleClickOpenModalSignIn}/>
                    </Container>

                    <AboutFeatureList/>
                </div>


        </React.Fragment>
    );
};

export default MainPageContent;
