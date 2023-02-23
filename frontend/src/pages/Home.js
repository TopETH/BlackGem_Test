import React, { Component } from "react";
import qs from "querystring";

import api from "../services/api";
import { getToken } from "../services/auth";

import UserTable from "../components/table/UserTable";
import AddUserForm from "../components/forms/AddUserForm";
import EditUserForm from "../components/forms/EditUserForm";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentUser: { id: null, username: "", email: "", info: "" },
      editing: false,
    };
  }

  componentDidMount() {
    this.refreshUserTable();
  }

  refreshUserTable() {
    const token = getToken();
    const headers = {
      Authorization: token,
    };

    this.usersData = api
      .get("api", { headers })
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          users: data.data,
          setUsers: data.data,
        });
      });
  }

  addUser = (user) => {
    const token = getToken();
    const headers = {
      Authorization: token,
    };

    api.post("api", qs.stringify(user), { headers }).then((res) => {
      this.refreshUserTable();
    });
  };

  deleteUser = (id) => {
    const token = getToken();
    const headers = {
      Authorization: token,
    };

    api.delete(`api/${id}`, { headers }).then((res) => {
      this.refreshUserTable();
    });
  };

  updateUser = (id, user) => {
    const token = getToken();
    const headers = {
      Authorization: token,
    };

    api.put(`api/${id}`, qs.stringify(user), { headers }).then((res) => {
      this.refreshUserTable();
    });

    this.setState({
      currentUser: { id: null, username: "", email: "", info: "" },
    });

    this.setEditing(false);
  };

  editRow = (user) => {
    this.setState({
      currentUser: {
        id: user.id,
        username: user.username,
        email: user.email,
        info: user.info,
      },
    });

    this.setEditing(true);
  };

  setEditing = (isEditing) => {
    this.setState({ editing: isEditing });
  };

  render() {
    const { users } = this.state;

    return (
      <div className='container'>
        <div className='row'>
          {this.state.editing ? (
            <div className='col s12 l6'>
              <h4>Edit User</h4>
              <EditUserForm
                editing={this.state.editing}
                setEditing={this.setEditing}
                currentUser={this.state.currentUser}
                updateUser={this.updateUser}
              />
            </div>
          ) : (
            <div className='col s12 l6'>
              <h4>Add user</h4>
              <AddUserForm addUser={this.addUser} />
            </div>
          )}

          <div className='col s12 l6'>
            <h5>Users</h5>
            <UserTable
              users={users}
              editRow={this.editRow}
              deleteUser={this.deleteUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
