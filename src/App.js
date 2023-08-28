import React from "react";
import Cookies from 'universal-cookie'

class App extends React.Component {
  //var csrftoken = getCookie('csrftoken');
  constructor(props) {
    super(props);

    this.state = {
      csrf: "",
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
    };
  }

  componentDidMount = () => {
    this.getJWT();
  }


  getJWT = () => {
    const message = localStorage.getItem('token');
    if (message!== undefined && message !== null) {
       this.setState({isAuthenticated: true});
    } else {
       this.setState({isAuthenticated: false});
    }
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleUserNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login = (event) => {
    event.preventDefault();
    fetch("http://zoo.com:8000/api/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: true, username: "", password: "", error: ""});
    localStorage.clear();
    localStorage.setItem('token', (data.token));
    sessionStorage.setItem('token', (data.token));
    const cookies = new Cookies();
    cookies.set('token', data.token)
    })
    .catch((err) => {
      console.log(err);
      this.setState({error: "Wrong username or password."});
    });
  }

  logout = () => {
      this.setState({isAuthenticated: false});
      localStorage.clear();
      sessionStorage.clear();
      const cookies = new Cookies();
      cookies.set("token", "");
    };

   tiger = () => {
   const token = localStorage.getItem('token');
    fetch("http://zoo.com:8000/api/tiger/test_tiger", {
        headers: {
        "Content-Type": "application/json",
        "Authorization": 'Token ' + token
      },
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

 tiger_post = () => {
   const token = localStorage.getItem('token');
    fetch("http://zoo.com:8000/api/tiger/test_tiger_post/", {
    method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": 'Token ' + token
      },
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  };


  lion_post = () => {
  const token = localStorage.getItem('token');
    fetch("http://zoo.com:9000/api/lion/test_lion_post/", {
    method: "POST",
       headers: {
        "Content-Type": "application/json",
        "Authorization": 'Token ' + token
      },
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  lion = () => {
  const token = localStorage.getItem('token');
    fetch("http://zoo.com:9000/api/lion/test_lion", {
       headers: {
        "Content-Type": "application/json",
        "Authorization": 'Token ' + token
      },
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div className="container mt-3">
          <h1>React JWT Auth</h1>
          <br />
          <button className="btn btn-primary mr-3" onClick={this.tiger}>GET_Tiger_8000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.tiger_post}>POST_Tiger_8000</button>
          <button className="btn btn-primary mr-3" onClick={this.lion}>GET_Lion_9000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.lion_post}>POST_Lion_9000</button>
          <h2>Login</h2>
          <form onSubmit={this.login}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
              <div>
                {this.state.error &&
                  <small className="text-danger">
                    {this.state.error}
                  </small>
                }
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      );
    }
    return (
      <div className="container mt-3">
        <h1>React JWT Auth</h1>
        <p>You are logged in!</p>
        <button className="btn btn-primary mr-3" onClick={this.logout}>Log out</button>
         <button className="btn btn-primary mr-3" onClick={this.tiger}>GET_Tiger_8000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.tiger_post}>POST_Tiger_8000</button>
          <button className="btn btn-primary mr-3" onClick={this.lion}>GET_Lion_9000</button>
          <button className="btn btn-primary mr-3" style = {{backgroundColor:'green'}} onClick={this.lion_post}>POST_Lion_9000</button>
      </div>
    )
  }
}

export default App;