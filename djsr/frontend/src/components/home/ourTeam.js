import React, { Component } from 'react'
import cus3 from './img/customer3.jpg';
import cus4 from './img/customer4.jpg';
import cus5 from './img/customer5.jpg';
import cus2 from './img/customer2.jpg';

export default class OurTeam extends Component {
    render() {
        return (
            <div className="pt-5 p-2">
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
                        <div className="col-lg-4 col-sm-6">
                            <div className="team-style-eleven text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0s">
                                <div className="team-image">
                                    <img className="rounded-circle" width="250" height="270" src={cus2} alt="Team" />
                                </div>
                                <div className="team-content">
                                    <h4 className="team-name">Jeffery Riley</h4>
                                    <span className="sub-title">Art Director</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
