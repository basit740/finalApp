import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './CountDown.module.css';
import Timer from '../utils/Timer';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

const CountDown = (props) => {
	const [seconds, setSeconds] = useState(0);
	const [mins, setMins] = useState(0);
	const [secs, setSecs] = useState(0);
	const [timerStarted, setTimerStarted] = useState(false);

	useEffect(() => {
		const myInterval = setInterval(() => {
			axios.get('http://localhost:5000/api/countdown').then((response) => {
				console.log(response.data);
				if (response.data.seconds === 60) {
					setTimerStarted(false);
				} else if (
					response.data.seconds === -1 ||
					response.data.seconds === -2
				) {
					clearInterval(myInterval);
					props.onComplete();
				} else {
					setTimerStarted(true);
					let mins = Math.floor(response.data.seconds / 60);
					let seconds = Math.floor(response.data.seconds - mins * 60);
					setMins(mins);
					setSecs(seconds);
				}
			});
		}, 1000);
	}, []);

	return (
		<div className={classes.counter}>
			<h1>COUNT DOWN TIMER</h1>

			{/* <Timer initialMinute={props.mintues} initialSeconds={seconds} /> */}

			{!timerStarted && <h1>loading...</h1>}
			{timerStarted && (
				<h1>
					{mins}:{secs}
				</h1>
			)}
		</div>
	);
};
export default CountDown;
