import React, { Component } from "react";
import service1 from "./ads/SPRINTER (1).png";
import service2 from "./ads/SPRINTER (2).png";
import service3 from "./ads/SPRINTER (3).png";
import service4 from "./ads/SPRINTER (4).png";
import service5 from "./ads/SPRINTER (5).png";
export default class Service extends Component {
  constructor() {
    super();
    this.state = {
      services: [
        {
          name: "Face Recognition",
          detail:
            "Get the best Attedance Management System for your College. A powerful cloud-based solution. Manage at your premises with smart cloud based solution.",
          image: service1,
        },
        {
          name: "Counting Attendance",
          detail:
            "Once you have entered or imported your list of students and classes, taking attendance for each of them is as simple as selecting the class and tapping on each student in the list from any device anywhere.",
          image: service2,
        },
        {
          name: "Authorization",
          detail:
            "All the faculties are authorized by HOD or principal and every student is authorized by their respective HOD and department faculties.",
          image: service3,
        },
        {
          name: "Look Up Attendance Online",
          detail:
            "You can see every student's attendance on our website and as well as approve or delete your college students or faculties.",
          image: service4,
        },
        {
          name: "Review Attendance Online",
          detail:
            "Professor or HOD can review every student's attendance. For example too low or medium etc.",
          image: service5,
        },
      ],
    };
  }
  render() {
    const { services } = this.state;
    return (
      <div className="pt-5 py-2 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="section-title text-center pb-10">
                <h3 className="title text-capitalize">Our Services</h3>
                <p className="text">
                  Stop wasting time and money designing and managing a website
                  that doesn’t get results. Happiness guaranteed!
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            {services.map((item, i) => (
              <div className="col-md-auto m-3 p-2 shadow bg-white rounded" key={i}>
                <div
                  className="card"
                  style={{ width: "18rem", height: "82vh" }}
                >
                  <img
                    className="card-img-top"
                    src={item.image}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
