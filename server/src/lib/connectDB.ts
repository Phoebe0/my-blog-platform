import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // 检查环境变量
        if (!process.env.MONGO) {
            throw new Error('MONGO environment variable is not defined.');
        }
        await mongoose.connect(process.env.MONGO);
        console.log('MongoDB connected !');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
export default connectDB;