import React, { Component } from 'react'
import Slide_home from './slide';
import Service from './services';
import Faq from './faq';
import Testimonials from './testimonials';
import OurTeam from './ourTeam';
import Footer from '../footer/footer';
export default class Home extends Component {
    render() {
        return (
            <div className="mb-5 pb-10">
                <div>
                    <Slide_home/>
                </div>
                <div>
                    <Service/>
                </div>
                <div>
                    <Faq/>
                </div>
                <div>
                    <Testimonials/>
                </div>
                <div>
                    <OurTeam/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        )
    }
}
