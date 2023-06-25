import puppeteer from 'puppeteer';

export default async function buscaValorAcoes(acao) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

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

  return valor;
}
