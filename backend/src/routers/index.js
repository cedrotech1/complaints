import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import ClaimRouter from './ClaimsRouter';
import agencyRouter from './agencyRoutes';
import replyRouter from './replyRoutes';



const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Claim', ClaimRouter);
router.use('/agencies', agencyRouter);
router.use('/replies', replyRouter);




export default router;
