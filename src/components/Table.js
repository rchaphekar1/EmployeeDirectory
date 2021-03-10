import React, { Component } from "react";
import API from "../utils/API.js";
import Title from './Title.js';
import SearchForm from './SearchForm.js';
import "./style.css";

class Table extends Component {
  state = {
    result: [],
    search: ""
  };

  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({ result: res.data.results })
        console.log(this.state.result)
      }).catch(err => console.log(err))
  };

  handleInputChange = event => {
    if (event.target.name === "search") {
      const value = event.target.value.toLowerCase();
      this.setState({
        search: value
      });
    }
  };
  
  render() {
    return (
      <div>
        <Title />
        <SearchForm handleInputChange={this.handleInputChange} search={this.state.search} />
        <table className="table table-responsive table-striped table-resposive text-center table-hover">
          <thead>
            <tr>
              <th>Picture</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
            </tr>
          </thead>

          {this.state.result && this.state.result.map(item =>
            item.name.first.toLowerCase().includes(this.state.search) ?
            <tbody key={item.login.uuid}>
              <tr>
                <td><img src={item.picture.thumbnail} alt="Thumbnail"/></td>
                <td>{item.name.first}</td>
                <td>{item.name.last}</td>
                <td>{item.cell}</td>
                <td>{item.email}</td>
                <td>{item.dob.date}</td>
              </tr>
            </tbody>

            :

            item.name.last.toLowerCase().includes(this.state.search) ?
            <tbody key={item.login.uuid}>
              <tr>
                <td><img src={item.picture.thumbnail} alt="Thumbnail"/></td>
                <td>{item.name.first}</td>
                <td>{item.name.last}</td>
                <td>{item.cell}</td>
                <td>{item.email}</td>
                <td>{item.dob.date}</td>
              </tr>
            </tbody>

            :

            null
          )}
        </table>
      </div>
    )
  }
}

export default Table;
