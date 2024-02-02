import {SvgIconComponent} from "@mui/icons-material";
import exp from "constants";

export interface ISignInForms {
    setShowSignInForm: (value: boolean) => void;
    setShowSignUpForm: (value: boolean) => void;
    goToHistoryTimeLine?: boolean;
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
    content: string | IArticleContentArrayItem[]
    subArticleTest?: IDataForQuiz
}

export interface IArticleContentArrayItem {
    type?: string,
    text: string
}

export interface HistoricalEvent {
    readonly date: string;
    readonly text: string;
    readonly content?: string | IArticleContentArrayItem[]
    mainArticleTest?: IDataForQuiz
    readonly achieved: string
    readonly subtopics?: SubtopicsProps[] | undefined;
}

export interface IHistoryListArray {
    readonly historyList: HistoricalEvent[],
}

export interface IHistoryTimelineProps extends IHistoryListArray, ISetSelectedArticle {
    buttonStates: Array<boolean>;
    successLevels: Array<boolean>;
    subArticleSuccessLevels: boolean[][]
    selectedArticle:number
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

interface IAchievedListItem {
    name: string,
    description: string
}

export interface ProfilePageProps extends IHistoryListArray {
    username: string;
    avatar: string;
    lessonsVisited: number;
    achievementLevel: string;
    achievements: string[];
    readonly achievedList: IAchievedListItem[];
}

export interface IArticleProps extends IHistoryListArray, ISetSelectedArticle {
    subArticleSuccessLevels: boolean[][];
    readonly setSelectedSubArticle: (arg0: number) => void;
}

export interface ISubtopicCardProps extends SubtopicsProps {
    subArticleIndex: number;
    done: boolean,
}

interface IDataForQuiz {
    readonly questions: string[];
    readonly options: string[][];
    readonly correctAnswers: string[];
}

export interface IQuizBlockProps extends IHistoryListArray, IDataForQuiz {
    testType: 'article' | 'subArticle';
    readonly onAnswer: (results: { correct: number; incorrect: number }) => void;
    readonly handleNextLevel: () => void;
    readonly setAllAnswerIsCorrect: (arg0: boolean) => void
    readonly setSelectedSubArticle?: (arg0: number) => void;
}

export interface IMainPageContent extends IHandleClickOpenModalSignIn {

}

export interface IProfilePopper {
    anchorEl: HTMLElement | null,
    openProfileMenu: boolean
    handlePopoverClose: () => void
    logoutOnClick: () => void;
    toggleColorModeFunc: () => void;
}

interface ColoredSvgIconProps extends SvgIconComponent {
}


export interface IAchievedItem extends IAchievedListItem {
    active: boolean
    icon: ColoredSvgIconProps
}