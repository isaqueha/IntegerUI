import React, { useState } from "react";
import api from '../../services/api';
import Cookies from 'js-cookie';
import GoogleLogin from 'react-google-login';

export default function Login({ history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  
  async function handleSubmit(event) {
		event.preventDefault();
		// TODO Refactor duplicate code
    const response = await api.post('/user', { email, password });

		const { api_key } = response.data;
		Cookies.set('api_key', api_key, { expires: 1 });
		
		history.push('/dashboard');
	}

	async function onSignIn(googleUser) {
		if (!googleUser.profileObj.googleId || !googleUser.profileObj.email) {
			return false;
		}

		console.log(googleUser.profileObj);
		const response = await api.post('/user', { 
			email: googleUser.profileObj.email, 
			password: googleUser.profileObj.googleId
		});

		const { api_key } = response.data;
		Cookies.set('api_key', api_key, { expires: 1 });
		
		history.push('/dashboard');
	}
	
	return (
		<>
			<p>
				Create your User to get <strong>Integer Incrementing features</strong>.
			</p>
			<GoogleLogin
				className="googleSign"
				clientId="770435751242-d0ufvib7h68tgsdphcmv26dd12erpmie.apps.googleusercontent.com"
				buttonText="Log in"
				onSuccess={onSignIn}
				onFailure={onSignIn}
				cookiePolicy={'single_host_origin'}
			/>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">E-Mail *</label>
				<input
					required
					type="email"
					id="email"
					placeholder="Your e-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<label htmlFor="password">Password *</label>
				<input
					required
					type="password"
					id="password"
					placeholder="Your password"
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>

				<button className="btn" type="submit">Log in</button>
			</form>
		</>

	)
}