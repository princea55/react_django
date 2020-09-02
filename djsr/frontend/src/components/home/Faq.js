import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import css from "./homeStyle.css";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    
}));

export default function Faq() {
    const classes = useStyles();
    const faq_list = [
        {
            question: "Does it show historically data?",
            answser: "You can see your past attendance and also you can search previous semster records."


        },
        {
            question: "Does your information secure?",
            answser: "Yes your login data are saved using SHA256 encrption algorithum."


        },
        {
            question: "Does your website show realtime attendance?",
            answser: "Yes. You can serach by month and semester."


        },
        {
            question: "Can students modify their details?",
            answser: "ofcourse students can modify their college, deparment, and semester."


        },

    ]
    return (
        <div className="pt-5 py-2">
            <div className="container">
            <div className="" id="accordion">
                    <div className="faqHeader title text-capitalize ">
                    Frequently Asked Questions
                    </div>

                </div>
                <div className={classes.root}>
                    {
                        faq_list.map((item, id) => (
                            <Accordion className="my-2" key={id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className="font-weight-bolder">{item.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className="font-weight-normal">
                                        {item.answser}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }

                </div>
            </div>
        </div>

    );
}
