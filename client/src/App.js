import React, { useState, useEffect } from 'react';

import FirstPassword from './components/FirstPassword/FirstPassword';

import Passwords from './components/Passwords/Passwords';

import Video from './components/Video/Video';

import CountDown from './components/CountDown/CountDown';

import Final from './components/Final/Final';

import axios from 'axios';

function App() {
	const [showFirstPassword, setShowFirstPassword] = useState(true);
	const [showPasswords, setShowPasswords] = useState(false);
	const [showVideo, setShowVideo] = useState(false);
	const [showCountDown, setShowCountDown] = useState(false);

	const [passwords, setPasswords] = useState({});

	const [showFinal, setShowFinal] = useState(false);

	// All Errors

	const [firstPasswordError, setFirstPasswordError] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:5000/api/v1/flags').then((response) => {
			const {
				firstPassword,
				passwordTwo,
				passwordThree,
				passwordFour,
				passwordFive,
				video,
				countDown,
				final,
				passwords,
			} = response.data.flags;
			if (firstPassword === true) {
				setShowFirstPassword(false);

				setPasswords({
					passwordTwo,
					passwordThree,
					passwordFour,
					passwordFive,
				});

				setShowPasswords(true);
			}

			if (passwords === true) {
				//setShowVideo(true);
				setShowCountDown(true);
				setShowPasswords(false);
			}

			// if (video === true) {
			// 	setShowCountDown(true);
			// 	setShowVideo(false);
			// }
			if (countDown === true) {
				setShowCountDown(false);
				setShowFinal(true);
			}
		});
	}, []);

	const firstPasswordSuccessHandler = () => {
		setShowFirstPassword(false);
		setShowPasswords(true);
	};

	const passwordTwoSuccessHandler = () => {
		axios.get('http://localhost:5000/api/v1/flags').then((response) => {
			const {
				passwordTwo,
				passwordThree,
				passwordFour,
				passwordFive,
				passwords,
			} = response.data.flags;

			setPasswords({
				passwordTwo: true,
				passwordThree,
				passwordFour,
				passwordFive,
			});

			if (passwords === true) {
				//setShowVideo(true);
				setShowCountDown(true);
				setShowPasswords(false);
			}
		});
	};

	const passwordThreeSuccessHandler = () => {
		axios.get('http://localhost:5000/api/v1/flags').then((response) => {
			const {
				passwordTwo,
				passwordThree,
				passwordFour,
				passwordFive,
				passwords,
			} = response.data.flags;

			setPasswords({
				passwordTwo,
				passwordThree: true,
				passwordFour,
				passwordFive,
			});

			if (passwords === true) {
				//setShowVideo(true);
				setShowCountDown(true);
				setShowPasswords(false);
			}
		});
	};

	const passwordFourSuccessHandler = () => {
		axios.get('http://localhost:5000/api/v1/flags').then((response) => {
			const {
				passwordTwo,
				passwordThree,
				passwordFour,
				passwordFive,
				passwords,
			} = response.data.flags;

			setPasswords({
				passwordTwo,
				passwordThree,
				passwordFour: true,
				passwordFive,
			});

			if (passwords === true) {
				//setShowVideo(true);
				setShowCountDown(true);
				setShowPasswords(false);
			}
		});
	};

	const passwordFiveSuccessHandler = () => {
		axios.get('http://localhost:5000/api/v1/flags').then((response) => {
			const {
				passwordTwo,
				passwordThree,
				passwordFour,
				passwordFive,
				passwords,
			} = response.data.flags;
			console.log(passwords);
			setPasswords({
				passwordTwo,
				passwordThree,
				passwordFour,
				passwordFive: true,
			});
			if (passwords === true) {
				//setShowVideo(true);
				setShowCountDown(true);
				setShowPasswords(false);
			}
		});
	};

	const countDownCompleteHandler = () => {
		setShowCountDown(false);
		setShowFinal(true);

		axios.get('http://localhost:5000/api/v1/gotoFinal').then((response) => {
			///console.log(response)
		});
	};
	// const firstPasswordHandler = (password) => {
	// 	console.log(password);

	// 	axios
	// 		.post('http://localhost:5000/api/v1/firstPassword?password=' + password)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			if (response.data.success == true) {
	// 				setShowPassword(false);
	// 				setShowPasswords(true);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log('this is error');
	// 			console.log(err.response.data);
	// 			setFirstPasswordError(true);
	// 		});
	// };

	return (
		<>
			{showFirstPassword && (
				<FirstPassword onSuccess={firstPasswordSuccessHandler} />
			)}

			{showPasswords && (
				<Passwords
					passwords={passwords}
					onPasswordTwoSuccess={passwordTwoSuccessHandler}
					onPasswordThreeSuccess={passwordThreeSuccessHandler}
					onPasswordFourSuccess={passwordFourSuccessHandler}
					onPasswordFiveSuccess={passwordFiveSuccessHandler}
				/>
			)}
			{showVideo && <Video />}
			{showCountDown && <CountDown onComplete={countDownCompleteHandler} />}

			{showFinal && <Final />}
		</>
	);
}

export default App;
