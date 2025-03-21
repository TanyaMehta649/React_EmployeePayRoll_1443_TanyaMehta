import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import {Outlet} from 'react-router-dom';
export class HomePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Outlet/>
      </div>
    )
  }
}

export default HomePage