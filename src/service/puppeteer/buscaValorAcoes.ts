import puppeteer from 'puppeteer';
import { Request, Response } from 'express';

export default async function buscaValorAcoes(req: Request, res: Response) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const acao = req.query.acao;
  if (!acao)
    throw Error(
      'Por favor inclua o nome da ação que deseja pesquisar no param ?acao= do url'
    );
  await page.goto(`https://www.google.com/search?q=${acao}+price`);
  const valor = await page.evaluate(() => {
    return {
      precoAtual: document.querySelector('span.IsqQVc.NprOob.wT3VGc').innerHTML,
      valorizacaoAtual: document.querySelector('span[jsname="qRSVye"]')
        .innerHTML,
      valorizacaoPercentualAtual: document.querySelector(
        'span[jsname="rfaVEf"]'
      ).innerHTML,
    };
  });
  await browser.close();

  res.json(valor);
}
