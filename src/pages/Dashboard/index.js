import React, { useEffect, useState } from "react";
import api from '../../services/api';
import Cookies from 'js-cookie';

export default function Dashboard({ history }) {
	let [current, setCurrent] = useState('');
	let [next, setNext] = useState('');

	useEffect(() => {
		async function loadIntegers() {
			let api_key = Cookies.get('api_key');
			if (!api_key) {
				history.push('/');
				return false;
			}
			const response = await api.get('/current', {
				headers: { api_key }
			});
			setCurrent(response.data.current);
			setNext(response.data.current + 1);
		}

		loadIntegers();
	}, [history]);

	async function handleGetNext(event) {
		event.preventDefault();
		let api_key = Cookies.get('api_key');
		const response = await api.get('/next', {
			headers: { api_key }
		});
		setCurrent(response.data.current);
		setNext(response.data.current + 1);
	}

	async function handleSetCurrent(event) {
		event.preventDefault();
		let api_key = Cookies.get('api_key');
		if (current < 0) {
			current = 0;
		}
		const response = await api.put('/current',
		{ current },
		{
			headers: { api_key },
		});
		setCurrent(response.data.current);
		setNext(response.data.current + 1);
	}

	return (
		<>
			<p>
				Check your <strong>Integer below</strong>:
			</p>

			<form>
				<div className="row">
					<label className="current" htmlFor="current">Current</label>
					<div className="row">
						<input
							type="number"
							min="0"
							id="current"
							placeholder="Current Integer"
							value={current}
							onChange={event => setCurrent(event.target.value)}
						/>
						<button type="submit" onClick={handleSetCurrent} className="btn">Set</button>
					</div>
				</div>

				<div className="row">
					<label className="next" htmlFor="next">Next</label>
					<div className="row">
						<input 
							disabled
							id="next"
							placeholder="Next Integer"
							value={next}
							onChange={event => setNext(event.target.value)}
						/>
						<button type="submit" onClick={handleGetNext} className="btn">Get</button>
					</div>
				</div>

		</form>
		</>
	 );
}