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
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal."


        },
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal."


        },
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal."


        },
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal."


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
