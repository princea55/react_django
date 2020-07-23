import React, { Component } from 'react'

export default class ListCollege extends Component {
    constructor(props) {
        super(props);
        this.state = {

            collagelist: ["GOVERNMENT ENGINEERING COLLEGE, BHARUCH",
                "GOVERNMENT ENGINEERING COLLEGE,BHAVNAGAR",
                "GOVERNMENT ENGINEERING COLLEGE, BHUJ",
                "GOVERNMENT ENGINEERING COLLEGE, DAHOD",
                "GOVERNMENT ENGINEERING COLLEGE,GANDHINAGAR",
            ]

        };
    }
    render() {
        {
            this.state.collagelist.map(col => {
                console.log(col);

            })
        }
        return (
            <div>

                <ul>
                    {this.state.collagelist.map(i => 
                            <li>{i}</li>
                    )}
                </ul>
            </div>
        )
    }
}
