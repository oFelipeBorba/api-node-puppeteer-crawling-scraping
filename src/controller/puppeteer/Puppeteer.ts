import realizaLoginChatGpt from '@/service/alexaChatGpt/realizaLogin';
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
      const acao = req.query.acao;
      if (!acao)
        throw Error(
          'Por favor inclua o nome da ação que deseja pesquisar no param ?acao= do url'
        );
      const valores = await buscaValorAcoes(acao);
      res.status(200).json(valores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  public static async realizaLoginChatGpt(req: Request, res: Response) {
    try {
      await realizaLoginChatGpt();
      res.status(200).json({ message: `ok` });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}
