
import express from 'express';
import userRouter from './user.route';
import postRouter from './post.route';
import commentRouter from './comment.route';

const routers:express.Router[] = [userRouter, postRouter,commentRouter];
export default routers;