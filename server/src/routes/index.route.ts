import express from 'express';
import userRouter from './user.route';
import postRouter from './post.route';
import commentRouter from './comment.route';
import webhookRouter from './webhook.route';


// 具名导出
export {userRouter, postRouter, commentRouter, webhookRouter};