import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import wingiLogo from '../../img/irembo_logo.png'
import { Button } from '../Layout/Button/Button';
import { FaShoppingCart } from "react-icons/fa";

const NavContainer = styled.nav`
  background: blue;
  .nav-link 
  {
    font-size: 1.3rem;
    text-transform:capitalize;
    
  }
`
export default class Navbar extends Component {
  render() {
    return (
      <NavContainer className='navbar navbar-expand-lg bg-secondary navbar-dark px-sm-5'>
        <Link to='/' >
          {/* <img src={wingiLogo} alt='store' className='navbar-brand' /> */}
        </Link>
        <ul className='navbar-nav mr-auto align-items-center'>
          <li className='nav-item ml-5'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
          <li className='nav-item ml-5'>
            <Link to='/login' className='nav-link'>
              Login
            </Link>
          </li>
        </ul>
      </NavContainer>
    );
  }
}