import React from 'react';
import data from "../../data/data.json";
import HistoryTimeline from "../HistoryTimeline/HistoryTimeline";
import {IMainPageContent} from "../../types/types";
import {Container} from "@mui/material";
import AboutProject from "../AboutProject/AboutProject";
import AboutFeatureList from "../AboutFeatureList/AboutFeatureList";
import {useAuth} from "../AuthContext/AuthContext";

const MainPageContent = ({
                             historyList,
                             buttonStates,
                             successLevels,
                             subArticleSuccessLevels,
                             setSelectedSubArticle,
                             setSelectedArticle,
                             handleClickOpenModalSignIn
                         }: IMainPageContent) => {

    const {isAuthenticated} = useAuth();

    return (
        <React.Fragment>
            {isAuthenticated ? <HistoryTimeline
                    setSelectedSubArticle={setSelectedSubArticle}
                    subArticleSuccessLevels={subArticleSuccessLevels}
                    setSelectedArticle={setSelectedArticle}
                    successLevels={successLevels}
                    buttonStates={buttonStates}
                    historyList={historyList}/>
                :
                <div className={"main_page"}>
                    <Container>
                        <AboutProject handleClickOpenModalSignIn={handleClickOpenModalSignIn}/>
                    </Container>

                    <AboutFeatureList/>
                </div>}


        </React.Fragment>
    );
};

export default MainPageContent;
