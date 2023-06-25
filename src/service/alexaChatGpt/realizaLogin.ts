import puppeteer from 'puppeteer';

async function aguardarConteudoCompleto(page, elemento) {
  const tempoEspera = 200; // Tempo de espera entre cada verificação
  const tempoMaximoSemAlteracao = 1500; // Tempo máximo sem alteração
  let ultimaContagemCaracteres = 0;
  let tempoSemAlteracao = 0;

  while (tempoSemAlteracao < tempoMaximoSemAlteracao) {
    const novaContagemCaracteres = await page.$eval(
      elemento,
      (el) => el.textContent.length
    );

    if (novaContagemCaracteres !== ultimaContagemCaracteres) {
      ultimaContagemCaracteres = novaContagemCaracteres;
      tempoSemAlteracao = 0;
    } else {
      tempoSemAlteracao += tempoEspera;
    }

    await page.waitForTimeout(tempoEspera);
  }
}

export default async function realizaLoginChatGpt(
  login?: string,
  senha?: string
) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(`https://chat.chatgptdemo.net/`);

  const arrayDePerguntas = [
    'Como sabemos que o homem foi a lua? Responda em 5 linhas.',
    'Retorna sua resposta em resumo de 2 linhas.',
  ];

  for (const pergunta of arrayDePerguntas) {
    console.log(`Entrei na pergunta: ${pergunta}`);
    await page.focus('textarea#input-chat');
    await page.click('textarea#input-chat');

    await page.type('textarea#input-chat', pergunta);
    await page.keyboard.press('Enter');
    const ultimoPre = 'pre.chat-content.chat-response';

    await aguardarConteudoCompleto(page, ultimoPre);
  }

  // Captura o último valor do elemento <pre> com a classe "chat-content chat-response"
  const valorPre = await page.$$eval(
    'pre.chat-content.chat-response',
    (preElements) => {
      const ultimoPre = preElements[preElements.length - 1];
      return ultimoPre.textContent;
    }
  );
  console.log('Valor capturado:', valorPre);
  await page.screenshot({ path: `screenshot.png` });
  await browser.close();

  return;
}
