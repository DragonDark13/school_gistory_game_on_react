export interface ISignInForms {
    setShowSignInForm: (value: boolean) => void;
    setShowSignUpForm: (value: boolean) => void;
    goToHistoryTimeLine?:boolean;
}

export interface IModalSignInSignUp extends ISignInForms {
    openModal: boolean
    handleCloseModal: () => void
    showSignInForm: boolean
    showSignUpForm: boolean
    setOpenModal: (value: boolean) => void;
}

export interface IHandleClickOpenModalSignIn {
    handleClickOpenModalSignIn: () => void;
}


export interface SubtopicsProps {
    title: string,
    content: string
}

export interface HistoricalEvent {
    date: string;
    text: string;
    achieved: string
    subtopics?: SubtopicsProps[] | undefined;
}

export interface IHistoryListArray {
    readonly historyList: HistoricalEvent[],
}

export interface IHistoryTimelineProps extends IHistoryListArray,ISetSelectedArticle{
    buttonStates: Array<boolean>;
    successLevels: Array<boolean>;
    subArticleSuccessLevels: boolean[][]
    readonly setSelectedSubArticle: (arg0: number) => void;
}

export interface ITimelineCardProps {
    event: HistoricalEvent;
    index: number;
    buttonState: boolean;
    readonly handleExpandArticle: (index: number) => void;
    readonly handleGoToTestNow: (index: number) => void;
    readonly handleGoToSubArticleTest: (index: number) => void;
    successLevel: boolean;
    isAllSubtaskDone: boolean;
    totalSubtopics: number,
    completedSubtopics: number,
}

export interface ISetSelectedArticle {
    readonly setSelectedArticle: (arg0: number) => void;
}

export interface ProfilePageProps extends IHistoryListArray {
    username: string;
    avatar: string;
    lessonsVisited: number;
    achievementLevel: string;
    achievements: string[];
}

export interface IArticleProps extends IHistoryListArray,ISetSelectedArticle{
    subArticleSuccessLevels: boolean[][];
}

export interface IQuizBlockProps extends IHistoryListArray{
    testType: 'article' | 'subArticle';
    readonly questions: string[];
    readonly options: string[][];
    readonly correctAnswers: string[];
    readonly onAnswer: (results: { correct: number; incorrect: number }) => void;
    readonly handleNextLevel: () => void;
    readonly setAllAnswerIsCorrect: (arg0: boolean) => void
    readonly setSelectedSubArticle?: (arg0: number) => void;
}

export  interface IMainPageContent extends IHandleClickOpenModalSignIn{

}
