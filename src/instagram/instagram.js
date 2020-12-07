const puppeteer = require('puppeteer');
const cnf = require('./configInstagram.json');
var page;

let _run  = async function() {
  // set up Puppeteer
  const browser = await puppeteer.launch({
    headless: cnf.settings.headless,
    args: ['--no-sandbox']
  });

  page = await browser.newPage();
  page.setViewport({width: 1200, height: 764});
    
  await _login();
  await _findGirlfriend();
  await _likeLastPost();

  // Close browser
  browser.close();
}

let _login = async function(){
  // Load Instagram
  await page.goto('https://www.instagram.com');
  await page.waitFor(2500);
  await page.click(cnf.selectors.home_to_login_button);
  await page.waitFor(2500);

  // Login
  await page.click(cnf.selectors.usuario);
  await page.keyboard.type(cnf.usuario);
  await page.click(cnf.selectors.senha);
  await page.keyboard.type(cnf.senha);

  await page.click(cnf.selectors.login_button);
  await page.waitForNavigation();
  await page.click(cnf.selectors.ativar_notificacao_agora_nao);
}

let _findGirlfriend = async function(){
  await page.goto('https://www.instagram.com/'+cnf.stalkeado);
  await page.waitFor(2500);
}

let _likeLastPost = async function(){
  let ultimoPost = await page.click(cnf.selectors.ultima_postagem);
  await page.waitFor(2500);
  let naoCurtido = await page.$(cnf.selectors.coracao_nao_curtido);
  
  if(naoCurtido){
    await page.click(cnf.selectors.coracao_nao_curtido);
  }
}

module.exports = _run;