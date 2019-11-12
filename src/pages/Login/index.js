import React, { useState } from "react";
import api from '../../services/api';
import Cookies from 'js-cookie';

export default function Login({ history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  
  async function handleSubmit(event) {
		event.preventDefault();
    const response = await api.post('/user', { email, password });

		const { api_key } = response.data;
		Cookies.set('api_key', api_key, { expires: 1 });
		
		history.push('/dashboard');
	}
	
	return (
		<>
			<p>
				Create your User to get <strong>Integer Incrementing features</strong>.
			</p>

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