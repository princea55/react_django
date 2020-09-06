import React, { Component } from 'react'

export default class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: " "
    }
  }
  render() {
    // console.log("better");
    // console.log(this.props.filterlst);
    // console.log(filterlst);

    return (
      <div>
        <div className="mt-3 container overflow-auto " style={{height: "60vh", backgroundColor: "rgb(233,233,233)"}}>

          <div className="table-responsive mt-3 ">
            <table className="table table-hover">
              <caption>Total no of records {this.props.filterlst.length}</caption>
              <thead>
                <tr className="table-info">
                  <th scope="col"></th>
                  <th scope="col">Date</th>
                  <th scope="col">Semester</th>
                </tr>
              </thead>
              <tbody className="h-100">
                {
                  this.props.filterlst ? (
                    this.props.filterlst.map((item, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item.created_date}</td>
                        <td>{item.sem}</td>
                      </tr>
                    ))
                  ) : (
                      <p>no results</p>
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
