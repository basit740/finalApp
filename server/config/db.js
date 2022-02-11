const mongoose = require('mongoose');

const connectDB = async () => {
	const conn = await mongoose.connect(
		'mongodb+srv://basit740:admin1122@bobisoftprojects.ljxbi.mongodb.net/finalApp?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);

	console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
