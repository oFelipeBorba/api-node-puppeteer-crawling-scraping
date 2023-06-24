import puppeteer from 'puppeteer';
import { Request, Response } from 'express';

export default async function exemploPuppeteer(req: Request, res: Response) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://developer.chrome.com/');
  await page.screenshot({ path: 'exemplo.png' });

  await browser.close();
  res.send({ message: 'Sucesso, o png foi salvo na raiz do projeto' });
}
