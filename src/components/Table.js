import React, { Component } from "react";
import API from "../utils/API.js";
import Title from './Title.js';
import SearchForm from './SearchForm.js';
import "./style.css";

class Table extends Component {
  state = {
    result: [],
    search: "",
    sortOrder: ""
  };

  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({ result: res.data.results })
        console.log(this.state.result)
      }).catch(err => console.log(err))
  };

  // Handles changes to what is being searched; Does not require a button
  handleInputChange = event => {
    if (event.target.name === "search") {
      const value = event.target.value.toLowerCase();
      this.setState({
        search: value
      });
    }
  };

  // Function to handle sorting by last name. Uses built-in sort() function, whose default value is ascending
  sortByLastName = () => {
    const sortedLastName = this.state.result.sort((a, b) => {
      if (b.name.last > a.name.last) {
        return -1
      } else if (a.name.last > b.name.last) {
        return 1
      } else {
        return 0
      };
    });
    if (this.state.sortOrder === "DESC") {
      sortedLastName.reverse();
      this.setState({ sortOrder: "ASC"});
    } else {
      this.setState({ sortOrder: "DESC"});
    };
    this.setState({ result: sortedLastName })
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
              <th>Last Name <span className="arrow" onClick={this.sortByLastName}></span></th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
            </tr>
          </thead>

          {/* Filters by matching first names */}
          {this.state.result && this.state.result.map(item =>
            item.name.first.toLowerCase().includes(this.state.search) ?
            // Login key required for each random user
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

            // Filters by matching last names
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
