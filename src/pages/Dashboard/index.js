import React, { useEffect, useState } from "react";
import api from '../../services/api';
import Cookies from 'js-cookie';

export default function Dashboard({ history }) {
	let [current, setCurrent] = useState('');
	let [next, setNext] = useState('');

	useEffect(() => {
		async function loadInitialValue() {
			let api_key = getApiKey();
			const response = await api.get('/current', {
				headers: { api_key }
			});
			updateIntegerValue(response.data.current);
		}

		loadInitialValue();
	}, [])

	useEffect(() => {
		async function validateAuth() {
			let api_key = getApiKey();
			if (!await isApiKeyValid(api_key)) {
				history.push('/');
				return false;
			}
		}

		validateAuth();
	}, [history]);

	async function handleGetNext(event) {
		event.preventDefault();
		let api_key = getApiKey()
		getInteger('/next', api_key);
	}

	async function handleSetCurrent(event) {
		event.preventDefault();
		validateCurrent();
		let api_key = getApiKey()
		putInteger('/current', api_key);
	}

	function validateCurrent() {
		if (current < 0) {
			current = 0;
		}
	}

	async function getInteger(endpoint, api_key) {
		const response = await api.get(endpoint, {
			headers: { api_key }
		});
		updateIntegerValue(response.data.current);
	}

	async function putInteger(endpoint, api_key) {
		const response = await api.put(endpoint,
		{ current },
		{
			headers: { api_key },
		});
		updateIntegerValue(response.data.current);
	}

	function updateIntegerValue(value) {
		if (value >= 0) {
			setCurrent(value);
			setNext(value + 1);
		}
	}

	function getApiKey() {
		let api_key = Cookies.get('api_key');
		return api_key;
	}

	async function isApiKeyValid(api_key) {
		if (!api_key) {
			return false;
		}
		const response = await api.get('/current', {
			headers: { api_key }
		});
		if (!response.data.current && response.data.current !== 0) {
			return false;
		}
		return true;
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