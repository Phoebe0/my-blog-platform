import express from "express";
import {clerkWebhook} from "../controllers/webhook.controller";
import bodyParser from "body-parser";

const router = express.Router();
router.post('/clerk',
    // 适用于 Content-Type 为 application/json 的请求。
    bodyParser.raw({type: 'application/json'}),
    clerkWebhook
);
export default router;