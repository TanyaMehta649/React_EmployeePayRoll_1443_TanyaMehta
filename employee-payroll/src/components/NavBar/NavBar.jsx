
//  //rce
//  import React, { Component } from 'react'
//  import Img from '../../assets/logo.jpg'
 
//  export class NavBar extends Component {
//    render() {
//      return (
//        <div class="emp-dash-page">
//            <header class="emp-dash-header">
//              <div class="emp-dash-header-cnt">
//                  <div class="emp-dash-header-logo">
//                      <img src={Img} alt="logo"/>
//                  </div>
//                  <div class="emp-dash-header-title">
//                      <span class="emp-dash-header-employee">EMPLOYEE</span>
//                      <span class="emp-dash-header-payroll">PAYROLL</span>
//                  </div>
//              </div>
//          </header>
//        </div>
//      )
//    }
//  }
 
//  export default NavBar
import React, { Component } from 'react'
import Img from '../../assets/logo.jpg'
import './NavBar.scss'

export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
      <div className="navbar-container">
        <div>
          <img src={Img} alt="Company Logo" />
        </div>
        <div className="navbar-employee-payroll">
          <div>EMPLOYEE</div>
          <div className="navbar-brPayroll">PAYROLL</div>
        </div>
      </div>
    </nav>
    )
  }
}

export default NavBar