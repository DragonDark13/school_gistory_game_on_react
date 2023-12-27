import React, {useEffect} from 'react';
import {IMainPageContent} from "../../types/types";
import {Container} from "@mui/material";
import AboutProject from "../AboutProject/AboutProject";
import AboutFeatureList from "../AboutFeatureList/AboutFeatureList";
import {useAuth} from "../AuthContext/AuthContext";
import {useNavigate} from "react-router-dom";

const MainPageContent = ({
                             handleClickOpenModalSignIn
                         }: IMainPageContent) => {

    const {isAuthenticated} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/timeline");

        }
    }, [isAuthenticated])


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
