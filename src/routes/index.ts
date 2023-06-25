import Router, { Response } from 'express';
import 'dotenv/config';
import PuppeteerController from '../controller/puppeteer/Puppeteer';

const router = Router();

router.get('/', (_, req: Response) => req.status(200).json({ message: 'ON' }));
router.get('/teste', PuppeteerController.exemplo);
router.get('/investimento', PuppeteerController.buscaValorAcoes);
router.get('/chat', PuppeteerController.realizaLoginChatGpt);

export default (app) => {
  app.use(router);
};
