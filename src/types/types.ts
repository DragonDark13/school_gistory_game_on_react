import {SvgIconComponent} from "@mui/icons-material";
import exp from "constants";
import {Dispatch, SetStateAction} from "react";

export interface ISignInForms {
    setShowSignInForm: (value: boolean) => void;
    setShowSignUpForm: (value: boolean) => void;
    goToHistoryTimeLine?: boolean;
}

export interface IModalSignInSignUp extends ISignInForms {
    openModal: boolean
    readonly handleCloseModal: () => void
    showSignInForm: boolean
    showSignUpForm: boolean
    setOpenModal: (value: boolean) => void;
}

export interface IHandleClickOpenModalSignIn {
    handleClickOpenModalSignIn: () => void;
}

export interface ISubtopicsTextContent {
    title: string,
    content: string | IArticleContentArrayItem[]
}

export interface SubtopicsProps extends ISubtopicsTextContent {
    readonly title: string,
    readonly content: string | IArticleContentArrayItem[]
    readonly sub_article_test_questions?: IDataForQuiz[]
    readonly sub_article_test_id?: number
}

export interface IArticleContentArrayItem {
    type?: string,
    text: string
}

export interface HistoricalEvent {
    readonly date: string;
    readonly text: string;
    readonly content?: string | IArticleContentArrayItem[]
    main_article_test_questions?: IDataForQuiz[]
    readonly achieved: string
    readonly main_article_test_id?: number
    readonly subtopics?: SubtopicsProps[];
}

export interface IHistoryListArray {
    readonly historyList: HistoricalEvent[],
}

export interface IHistoryTimelineProps extends IHistoryListArray, ISetSelectedArticle {
    buttonStates: Array<boolean>;
    // successLevels: Array<boolean>;
    successLevels: number,
    subArticleSuccessLevels: boolean[][]
    selectedArticle: number
    readonly setSelectedSubArticle: (arg0: number) => void;
    isLoading: boolean
}

export interface ITimelineCardProps {
    event: HistoricalEvent;
    index: number;
    buttonState: number;
    readonly handleExpandArticle: (index: number) => void;
    readonly handleGoToTestNow: (index: number) => void;
    readonly handleGoToSubArticleTest: (index: number) => void;
    successLevel: number;
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
    readonly username: string;
    avatar: string;
    lessonsVisited: number;
    achievementLevel: string;
    achievements: string[];
    readonly achievedList: IAchievedListItem[];
    isLoading: boolean;
    currentUserDate: string;

}

export interface IArticleProps extends IHistoryListArray, ISetSelectedArticle {
    subArticleSuccessLevels: boolean[][];
    readonly setSelectedSubArticle: (arg0: number) => void;
    isLoading: boolean;
    articleContentFromApp: IArticleContentArrayItem[];
    currentUser: IUser;

}

export interface ISubtopicCardProps extends SubtopicsProps {
    subArticleIndex: number;
    done: boolean,
    selectedArticleNumber: number,
    handleGoToSubTestNow: (articleIndex: number, subArticleIndex: number) => void;
}

export interface IDataForQuiz {
    readonly correct_answers: number;  // Індекс правильної відповіді (від 1 до 4)
    readonly id: number;  // Унікальний ідентифікатор питання
    readonly options: string[];  // Масив варіантів відповіді
    readonly question: string;  // Текст питання
}

export interface IQuizBlockProps extends IHistoryListArray, UserContextProps {
    readonly testType: 'article' | 'subArticle';
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

export interface ITestCompletedItem {
    completed: boolean;
    event_id: number;
    parent_article_title: string;
    test_id: number;
    test_type: string;
}

// Оновлений інтерфейс IUser
export interface IUser {
    name: string;
    current_level: number;
    user_name: string;
    tests_completed_list: ITestCompletedItem[]; // Використання нового інтерфейсу
    country: any;
    email: string;
    // Додайте інші властивості користувача, які вам потрібні
}

export interface UserContextProps {
    currentUser: null | IUser;
    setCurrentUser: Dispatch<SetStateAction<null | object>>;
}


export interface ILanguageContextProps {
    language: 'uk' | 'en';
    setLanguage: Dispatch<SetStateAction<'uk' | 'en'>>;
}

export interface IThemeContextProps {
    theme: 'light' | 'dark';
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export type QuizResultsProps = {
    results: any;
    percentCompleted: number;
    nextLevelAvailable: boolean;
    handleRetakeQuiz: () => void;
    currentUser: any;
    selectedArticleNumber: number;
    historyList: any[];
    testType: string;
};