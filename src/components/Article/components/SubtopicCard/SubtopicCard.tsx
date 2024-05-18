import React from 'react';
import {
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
} from '@mui/material';
import myImage from "../../../../static/image/city.jpg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./subtopics_card.scss"

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {useNavigate, useParams} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {ISubtopicCardProps} from "../../../../types/types";
import {contentRenderFunction} from "../../../../utils/utils";
import {styled} from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';


const SubtopicCard = ({content, title, subArticleIndex, done}: ISubtopicCardProps) => {

    const [expanded, setExpanded] = React.useState(false);
    const [openModalAdditional, setOpenModalAdditional] = React.useState(false);

    const handleCloseOpenModalAdditional = () => {
        setOpenModalAdditional(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const {selectedArticle} = useParams();
    const navigate = useNavigate();

    // Your logic to extract subtopics from historyList based on selectedArticle

    const handleGoToTest = () => {
        // Navigate to the test page with the selectedArticle parameter

        navigate(`/test/${selectedArticle}/${subArticleIndex}`);
    };
    return (
        <React.Fragment>
            <Card elevation={done ? 6 : 0} className={"subtopics_card"}>

                <CardHeader

                    avatar={done ? <CheckIcon/> : <CheckBoxOutlineBlankIcon/>}
                    titleTypographyProps={{
                        variant: "h5",

                    }}
                    title={title}
                />
                <CardMedia
                    component="img"
                    image={myImage}
                    alt="myImage"
                />

                <div className="hover_container"> {!expanded && !done && <CardActions disableSpacing>

                    <Button color={"secondary"} onClick={() => setOpenModalAdditional(true)}
                            endIcon={<QuestionMarkIcon/>}
                            aria-expanded={expanded} size={"small"} fullWidth variant={"contained"}
                            className="learn-more-button">
                        Дізнатися більше
                    </Button>

                </CardActions>}

                    {!done ? <CardActions disableSpacing>
                        <Button onClick={handleGoToTest} endIcon={<ArrowForwardIosIcon/>} color={"secondary"}
                                size={"small"}
                                fullWidth
                                variant={"outlined"}
                                className={"goToTest"}
                        >
                            Пройти тест
                        </Button>
                    </CardActions> : null
                    }</div>

                {/*{!done*/}
                {/*&&*/}
                {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        {contentRenderFunction(content)}*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}
                {/*}*/}


                {expanded && <CardActions disableSpacing>

                    <Button onClick={()=>setOpenModalAdditional(true)}
                            endIcon={<ExpandLessIcon/>}
                            color={"secondary"}
                            aria-expanded={expanded} size={"small"} fullWidth variant={"contained"}
                            className="learn-more-button">
                        Згорнути
                    </Button>
                </CardActions>}
            </Card>
            <Dialog className={"modal_with_sub_article_info"} fullWidth open={openModalAdditional}
                    onClose={handleCloseOpenModalAdditional}>
                <DialogTitle variant={"h4"} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseOpenModalAdditional}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    {contentRenderFunction(content)}
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={2} justifyContent={"end"}>
                        <Grid item xs={"auto"}>
                            <Button onClick={handleGoToTest} endIcon={<ArrowForwardIosIcon/>} color={"primary"}
                                    size={"medium"}

                                    variant={"contained"}
                                    className={"goToTest"}
                            >
                                Пройти тест
                            </Button>

                        </Grid>
                        <Grid item xs={"auto"}>
                            <Button onClick={handleCloseOpenModalAdditional} endIcon={<CloseIcon/>} color={"secondary"}
                                    size={"medium"}
                                    variant={"outlined"}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default SubtopicCard;
