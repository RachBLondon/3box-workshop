import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class App extends Component {

  state = {
    needToAWeb3Browser: false,
  }
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }
  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
    }
  }
  render() {

    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>
    }

    if (!this.state.needToAWeb3Browser && !this.state.accounts) {
      return <h1>Connect MetaMask</h1>
    }

    if (this.state.accounts) {

      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile"> Profile Update</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/profile">
                <Profile 
                  ethAddress={this.state.accounts[0]}
                  />
              </Route>
              <Route path="/">
                <Home
                  ethAddress={this.state.accounts[0]}
                 />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to 3Book</h2>
        {this.props.ethAddress}
      </div>
    )
  }
}


class Profile extends Component {
  render() {
    return (
      <div>
        <h2>Profile Edit</h2>
      </div>
    )
  }
}
