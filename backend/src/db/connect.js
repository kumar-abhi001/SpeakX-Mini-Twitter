import mongoose from 'mongoose';
import { DB_NAME } from '../../constant.js';

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        console.log("DB is connected");
    } catch (error) {
        console.log("Error while connecting to DB:", error);
        process.exit(1);
    }
}

export { ConnectDB };