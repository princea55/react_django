import React, { Component } from 'react';
import css from './testimonials.css';
import cus1 from './img/customer1.jpg';
import cus2 from './img/customer2.jpg';
import cus3 from './img/customer3.jpg';
import cus4 from './img/customer4.jpg';
import cus5 from './img/customer5.jpg';

export default class Testimonials extends Component {
    constructor() {
        super();
        this.state = {
            customers: [
                {
                    name: "Emma Anderson",
                    message: "“sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.”",
                    address: "Junagadh, Gujarat",
                    image: cus1,
                    active: "carousel-item active"
                },
                {
                    name: "Jonathan Cooper",
                    message: "“sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.”",
                    address: "Rajkot, Gujarat",
                    image: cus2,
                    active: "carousel-item"
                },
                {
                    name: "Olivia khaksarmadani",
                    message: "“sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.”",
                    address: "Surat, Gujarat",
                    image: cus3,
                    active: "carousel-item"
                }
            ]
        }
    }
    render() {
        const { customers } = this.state;
        return (
            <div className="pt-5 py-2 bg-light">
                <div className="">

                    <div class="row justify-content-center p-2 mb-2">
                        <div class="col-md-8 text-center">
                            <h6 class="sub-title">Testimonials</h6>
                            <h4 class="mb-3">What Clients Says About Us</h4>
                        </div>
                    </div>

                    <div id="carouselExampleIndicators" className="carousel bg-light slide carousel-fade" data-keyboard="true" data-touch="true" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            {
                                customers.map((item, i) => (
                                    <div className={item.active} data-interval="4000" key={i}>
                                        <div className="card card-shadow border-0 mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="d-flex no-block align-items-center">
                                                            <span className="thumb-img"><img className="rounded-circle" width="350" height="370" src={item.image} alt="wrapkit" /></span><br />
                                                            <br />
                                                            <div className="ml-3">
                                                                <h6 className="mb-0 customer">{item.name}</h6>
                                                                <p>{item.address}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm d-flex align-content-center flex-wrap">
                                                        <h6 className="font-weight-light mb-3">{item.message}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

