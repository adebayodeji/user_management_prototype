import React from "react";
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginForm extends React.Component {
	render() {
		return (
			<div className="container">
				<Form>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted"></Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					
					<Button variant="primary" type="submit">Submit</Button>
				</Form>
			</div>
		);
	}
}

export default LoginForm;
