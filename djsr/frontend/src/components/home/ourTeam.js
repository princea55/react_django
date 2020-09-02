import React, { Component } from 'react'
import cus3 from './img/jaydeep.jpg';
import cus4 from './img/prince.png';
import cus5 from './img/harshal.png';
import cus2 from './img/hiren.png';

export default class OurTeam extends Component {
    constructor() {
        super();
        this.state = {
            members: [
                {
                    name: "Prince Suriya",
                    image: cus4,
                    expert: "Full Stack Developer"
                },
                {
                    name: "Jaydeep Talaviya",
                    image: cus3,
                    expert: "ML Engineer"
                },
                {
                    name: "Harshal Jadhav",
                    image: cus5,
                    expert: "MERN Stack Developer"
                },
                {
                    name: "Hiren Lakhani",
                    image: cus2,
                    expert: "Backend Developer/Ui Designer"
                },
            ]
        }
    }
    render() {
        const { members } = this.state;
        return (
            <div className="pt-5 py-2">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-10">
                            <div className="section-title text-center pb-30">
                                <h3 className="title">Meet The Team</h3>
                                <p className="text">Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {
                            members.map((item, i) => (
                                <div className="col" key={i}>
                                    <div className="team-style-eleven text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0s" key={i}>
                                        <div className="team-image">
                                            <img className="rounded-circle" width="200" height="200" src={item.image} alt="Team" />
                                        </div>
                                        <div className="team-content">
                                            <h4 className="team-name">{item.name}</h4>
                                            <span className="sub-title">{item.expert}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>

        )
    }
}
