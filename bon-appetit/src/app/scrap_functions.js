const dotenv = require('dotenv');
const puppeteer = require('puppeteer-extra');
const randomUseragent = require('random-useragent');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { GoogleGenerativeAI } = require('@google/generative-ai');


dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
puppeteer.use(StealthPlugin());
async function obtainReviews() {
  const browser = await puppeteer.launch({
    headless : true,
    args: ['--incognito',
          `--ignore-certificate-errors`,
           `--no-sandbox`,
          `--disable-setuid-sandbox`,]
  });
  const pages = await browser.pages();
  const page = pages[0];
  const pageUrl = `https://www.google.com/maps/place/Mister+Wings/@3.4045776,-76.5989681,11z/data=!4m12!1m2!2m1!1smister+wings+cali+rese%C3%B1as!3m8!1s0x8e30a174db9022d1:0x98dd9d23dd9d5394!8m2!3d3.3673381!4d-76.5272447!9m1!1b1!15sChptaXN0ZXIgd2luZ3MgY2FsaSByZXNlw7FhcyIFOAGIAQFaHCIabWlzdGVyIHdpbmdzIGNhbGkgcmVzZcOxYXOSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11c46568_k?entry=ttu`
  await page.setExtraHTTPHeaders({ 'x-devtools-emulate-network-conditions-client-id': '1' });
  await page.setUserAgent(randomUseragent.getRandom().toString());
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

  
  
  try{
    await page.waitForSelector('.wiI7pd',{timeout:2000});
    //await page.waitForSelector('[jstcache="54"]');

  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => {
      const reviewsContainer = document.querySelector(".m6QErb.DxyBCb.kA9KIf.dS8AEf");
      reviewsContainer.scrollBy(0, 500);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
   
    // Obtiene las reseñas
    const data = await page.evaluate(() => {
    const reviews = Array.from(document.querySelectorAll('.wiI7pd')).map(review => review.innerText); 
      return reviews;
    
  });

  //obtenerYGenerarRespuesta(data)
  return data; // Devuelve las reseñas
  
} catch (error) {
  console.error('Error:', error);
  obtainReviews()
} finally {
  // Cierra el navegador
  await browser.close();
}
}

async function generarRespuesta(reseñas) {
    let prompt = `Clasificame estas reseñas separadas por malas y buenas:\n${reseñas.join('\n')}`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  
  
  
  
  async function obtenerYGenerarRespuesta() {
    try {
      reviews = await obtainReviews()
    if (reviews.length > 0) {
      const respuesta = await generarRespuesta(reviews);
      console.log('Respuesta generada:', respuesta);
    }
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
    }
  }

  