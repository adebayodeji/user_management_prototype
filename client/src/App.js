import React, { Fragment, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/login/Login";

import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Signup from "./components/signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import ForgotPassword from "./components/Password/ForgotPasswordPage/ForgotPassword";
import ConfirmPassword from "./components/Password/ConfirmPassword";
import Dashboard from "./components/MainPage/MainPage";


class LoginForm extends React.Component {
	render() {
		return (
			<Fragment>
				<BrowserRouter>
					<Routes>
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/signup" element={<Signup />} />
						<Route exact path="/forgotten-password" element={<ForgotPassword />} />
						<Route exact path="/change-password" element={<ConfirmPassword />} />
						<Route exact path="/dashboard" element={<Dashboard />} />
						{/*<Route exact path="/user/albums/:userID" element={<AlbumPage />} /> */}
						<Route exact path="/" element={<Login />} />
						{/* <Route path='*' element={<Error />} /> */}
					</Routes>
				</BrowserRouter>,
			</Fragment>
		);
	}
}

export default LoginForm;
