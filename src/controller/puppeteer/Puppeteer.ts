import buscaValorAcoes from '@/service/puppeteer/buscaValorAcoes';
import exemploPuppeteer from '@/service/puppeteer/exemplo';
import { Request, Response } from 'express';
export default class PuppeteerController {
  public static async exemplo(req: Request, res: Response) {
    try {
      await exemploPuppeteer(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  public static async buscaValorAcoes(req: Request, res: Response) {
    try {
      await buscaValorAcoes(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
