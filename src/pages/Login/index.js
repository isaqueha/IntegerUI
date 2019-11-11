import React, { useState } from "react";
import api from '../../services/api';

export default function Login({ history }) {
	const [email, setEmail] = useState('');
  
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

		localStorage.setItem('user', _id);
		
		history.push('/dashboard');
	}
	
	return (
		<>
			<p>
				Crie sua <strong>Árvore de família</strong> de maneira fácil e rápida e <strong>guarde suas memórias</strong>.
			</p>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email">E-Mail *</label>
				<input 
					type="email"
					id="email"
					placeholder="Seu melhor e-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<button className="btn" type="submit">Entrar</button>
			</form>
		</>

	)
}