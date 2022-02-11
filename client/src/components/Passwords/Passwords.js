import React, { useState, useEffect } from 'react';
import classes from './Passwords.module.css';
import axios from 'axios';
const Passwords = (props) => {
	const [secondPassError, setSecondPassError] = useState(false);
	const [thirdPassError, setThirdPassError] = useState(false);
	const [fourthPassError, setFourthPassError] = useState(false);
	const [fifthPassError, setFifthPassError] = useState(false);

	//passwords values

	const [passwordTwo, setPasswordTwo] = useState('');
	const [passwordThree, setPasswordThree] = useState('');
	const [passwordFour, setPasswordFour] = useState('');
	const [passwordFive, setPasswordFive] = useState('');

	// for showing differet passwords

	const [showPasswordInputTwo, setShowPasswordInputTwo] = useState(true);
	const [showPasswordInputThree, setShowPasswordInputThree] = useState(true);
	const [showPasswordInputFour, setShowPasswordInputFour] = useState(true);
	const [showPasswordInputFive, setShowPasswordInputFive] = useState(true);

	const passwordTwoHandler = (event) => {
		setPasswordTwo(event.target.value);
	};

	const passwordThreeHandler = (event) => {
		setPasswordThree(event.target.value);
	};

	const passwordFourHandler = (event) => {
		setPasswordFour(event.target.value);
	};

	const passwordFiveHandler = (event) => {
		setPasswordFive(event.target.value);
	};

	/// Handling enter key for all the inputs

	const enterKeyHandlerTwo = (event) => {
		if (event.key === 'Enter') {
			axios
				.post(
					'http://localhost:5000/api/v1' +
						'/passwordTwo?password=' +
						passwordTwo
				)
				.then((response) => {
					if (response.data.success === true) {
						setShowPasswordInputTwo(false);
						props.onPasswordTwoSuccess();
					}
				})
				.catch((err) => {
					setSecondPassError(true);
				});
		}
	};

	const enterKeyHandlerThree = (event) => {
		if (event.key === 'Enter') {
			axios
				.post(
					'http://localhost:5000/api/v1/passwordThree?password=' + passwordThree
				)
				.then((response) => {
					if (response.data.success === true) {
						setShowPasswordInputThree(false);
						props.onPasswordThreeSuccess();
					}
				});
		}
	};
	const enterKeyHandlerFour = (event) => {
		if (event.key === 'Enter') {
			axios
				.post(
					'http://localhost:5000/api/v1/passwordFour?password=' + passwordFour
				)
				.then((response) => {
					if (response.data.success === true) {
						setShowPasswordInputFour(false);
						props.onPasswordFourSuccess();
					}
				});
		}
	};

	const enterKeyHandlerFive = (event) => {
		if (event.key === 'Enter') {
			axios
				.post(
					'http://localhost:5000/api/v1/passwordFive?password=' + passwordFive
				)
				.then((response) => {
					if (response.data.success === true) {
						setShowPasswordInputFive(false);
						props.onPasswordFiveSuccess();
					}
				});
		}
	};

	useEffect(() => {
		if (props.passwords.passwordTwo === true) {
			setShowPasswordInputTwo(false);
		}

		if (props.passwords.passwordThree === true) {
			setShowPasswordInputThree(false);
		}

		if (props.passwords.passwordFour === true) {
			setShowPasswordInputFour(false);
		}

		if (props.passwords.passwordFive === true) {
			setShowPasswordInputFive(false);
		}
	}, []);

	return (
		<div className={classes.passwords}>
			<div className={classes['passwords-content']}>
				{showPasswordInputTwo && (
					<div className={classes['passwords__two']}>
						<input
							type='text'
							className={secondPassError && `${classes.error}`}
							placeholder='Password 2'
							onChange={passwordTwoHandler}
							onKeyDown={enterKeyHandlerTwo}
						/>
					</div>
				)}

				<div className={classes['passwords__three-and-four']}>
					{showPasswordInputThree && (
						<div className={classes['passwords__three']}>
							<input
								type='text'
								placeholder='Password 3'
								onChange={passwordThreeHandler}
								onKeyDown={enterKeyHandlerThree}
							/>
						</div>
					)}

					{showPasswordInputFour && (
						<div className={classes['passwords__four']}>
							<input
								type='text'
								placeholder='Password 4'
								onChange={passwordFourHandler}
								onKeyDown={enterKeyHandlerFour}
							/>
						</div>
					)}
				</div>

				{showPasswordInputFive && (
					<div className={classes['passwords__five']}>
						<input
							type='text'
							placeholder='Password 5'
							onChange={passwordFiveHandler}
							onKeyDown={enterKeyHandlerFive}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Passwords;
