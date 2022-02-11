import React, { useState, useEffect } from 'react';
import classes from './FirstPassword.module.css';
import axios from 'axios';
const FirstPassword = (props) => {
	const [isError, setIsError] = useState(false);
	const [isChecking, setIsChecking] = useState(false);
	const [password, setPassword] = useState('');
	const passwordHandler = (event) => {
		setIsError(false);
		setPassword(event.target.value);
	};

	const enterKeyHandler = (event) => {
		if (event.key === 'Enter') {
			//props.onPassword(password);
			setIsChecking(true);
			axios
				.post('http://localhost:5000/api/v1/firstPassword?password=' + password)
				.then((response) => {
					console.log(response.data);
					if (response.data.success == true) {
						props.onSuccess();
					}
				})
				.catch((err) => {
					console.log('this is error');
					console.log(err.response.data);
					setIsChecking(false);
					setIsError(true);
				});
		}
	};
	return (
		<div className={classes['first-password']}>
			<div className={classes['first-password-content']}>
				<div className={classes['first-password__text']}>
					<h1>ENTER PASSWORD</h1>
				</div>
				<div className={classes['first-password__input']}>
					<input
						type='text'
						placeholder='PASSWORD 1'
						onChange={passwordHandler}
						onKeyDown={enterKeyHandler}
					/>
				</div>
				{isError && (
					<p className={classes['error-message']}>
						You have entered the wrong password, please try again.
					</p>
				)}
				{isChecking && <p>checking...</p>}
			</div>
		</div>
	);
};

export default FirstPassword;
