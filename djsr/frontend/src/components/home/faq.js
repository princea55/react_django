import React from "react";
import css from "./homeStyle.css";
export default function Faq() {
    var faq_list = [
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal.",
            colpass:"#collapseFour"
            
        },
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal.",
            colpass:"#one"
            
        },
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal.",
            colpass:"#two"
            
        },
        {
            question: " I want to buy a theme - what are the steps?",
            answser: "simple. Each theme has a live preview. Once you have selected a theme or template, which is to your liking, you can quickly andsecurely pay via Paypal.",
            colpass:"#three"
            
        },
        
    ]
    return (
        <div className="pt-5 p-2">
            <div className="container">
                <div className="" id="accordion">
                    <div className="faqHeader title text-capitalize ">
                    Frequently Asked Questions
                    </div>

                </div>
                {
                    faq_list.map((item, i) => (
                        <div className="card my-3" key={i}>
                            <div className="card-header">
                                <h4 className="card-header">
                                    <a
                                        className="accordion-toggle collapsed text-decoration-none text-muted font-weight-normal"
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href={item.colpass}
                                    >
                                        {item.question}
                                    </a>
                                </h4>
                            </div>
                            <div id={item.colpass.slice(1)} className="panel-collapse collapse">
                                <div className="card-block py-5 px-2">
                                {item.answser}
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}
