import axios from "axios";
// API URL that returns 50 random users from the US only
const BASEURL = "https://randomuser.me/api/?results=50&nat=us";

export default {
  search: function() {
    return axios.get(BASEURL);
  }
};