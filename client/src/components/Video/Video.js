import classes from './Video.module.css';
const Video = () => {
	return (
		<div className={classes.video}>
			<video width='100%' height='100%' controls>
				<source src='movie.mp4' type='video/mp4' />
				<source src='movie.ogg' type='video/ogg' />
			</video>
		</div>
	);
};

export default Video;
