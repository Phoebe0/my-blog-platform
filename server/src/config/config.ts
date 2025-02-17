import dotenv from 'dotenv';

dotenv.config();

export const config = {
    IK_URL_ENDPOINT: process.env.IK_URL_ENDPOINT || '',
    IK_PUBLIC_KEY: process.env.IK_PUBLIC_KEY || '',
    IK_PRIVATE_KEY: process.env.IK_PRIVATE_KEY || '',
};