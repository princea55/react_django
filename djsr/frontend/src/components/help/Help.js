import React, { Component } from 'react'

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            help_step : [
                {
                    step: "Step 1",
                    answser: "In step one collect the photos of your college students by clicking on the Data collect button. (Student name and enrollment are must be the same as students give their username and enrollment on the website.) And capture 30 photos of each student by pressing 'S' in the keyboard. Take student photos at some little bit different angle.",
                    target:"#collapseOne",
                    col:"collapseOne"                    
                },
                {
                    step: "Step 2",
                    answser: "Now after collecting all data you can train the data by click on the train button.",
                    target:"#collapseTwo",
                    col:"collapseTwo" 
                },
                {
                    step: "Step 3",
                    answser: "Now you're ready to go click on the start attendance button and take attendance of your students.",
                    target:"#collapseThree",
                    col:"collapseThree" 
                },
                {
                    step: "Step 4",
                    answser: "And lastly, upload the attendance on the website by clicking the upload attendance button.",
                    target:"#collapseFour",
                    col:"collapseFour" 
                }
            ]
        }
    }
    render() {
        return (
            <div className="container mt-4">
                <h1><span class="badge badge-secondary">Guidelines of software </span></h1>
                <div className="accordion" id="accordionExample">
                    {
                        this.state.help_step.map((item, id) => (
                            <div className="card" key={id}>
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn h5 btn-block text-left" type="button" data-toggle="collapse" data-target={item.target} aria-expanded="true" aria-controls="collapseOne">
                                            {item.step}
                                    </button>
                                    </h2>
                                </div>

                                <div id={item.col} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                      {item.answser}  
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
