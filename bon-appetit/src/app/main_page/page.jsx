'use client';
import React, {useState, useEffect} from 'react';
import Header from '@/components/header';
import Card from '@/components/card';


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const obtainedCards = [
        { brandName: "Mc Donald's", logoImage: "/images/McDonald's_logo.png", url: "https://www.google.com/maps/place/McDonald's+El+Ed%C3%A9n/@3.4215991,-76.5638711,13z/data=!4m12!1m2!2m1!1smc+donald's+cali+rese%C3%B1as!3m8!1s0x8e30a618687f9615:0x76d5937bab2f6c13!8m2!3d3.4752027!4d-76.5268239!9m1!1b1!15sChltYyBkb25hbGQncyBjYWxpIHJlc2XDsWFzIgU4AYgBAVobIhltYyBkb25hbGQncyBjYWxpIHJlc2XDsWFzkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F1tdlcs1v?entry=ttu" },
        { brandName: "Mister Wings", logoImage: "/images/mister-wings.png", url: "https://www.google.com/maps/place/Mister+Wings/@3.4045776,-76.5989681,11z/data=!4m12!1m2!2m1!1smister+wings+cali+rese%C3%B1as!3m8!1s0x8e30a174db9022d1:0x98dd9d23dd9d5394!8m2!3d3.3673381!4d-76.5272447!9m1!1b1!15sChptaXN0ZXIgd2luZ3MgY2FsaSByZXNlw7FhcyIFOAGIAQFaHCIabWlzdGVyIHdpbmdzIGNhbGkgcmVzZcOxYXOSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11c46568_k?entry=ttu" },
        { brandName: "Domino's Pizza", logoImage: "/images/Domino's_pizza_logo.png", url: "https://www.google.com/maps/place/Domino's+Pizza+Limonar/@3.4030175,-76.6097435,13z/data=!4m12!1m2!2m1!1sdomino's+pizza+cali+rese%C3%B1as!3m8!1s0x8e30a1e34c97946f:0x613b934086b43fb1!8m2!3d3.4030175!4d-76.5438255!9m1!1b1!15sChxkb21pbm8ncyBwaXp6YSBjYWxpIHJlc2XDsWFzIgU4AYgBAVoeIhxkb21pbm8ncyBwaXp6YSBjYWxpIHJlc2XDsWFzkgEQcGl6emFfcmVzdGF1cmFudOABAA!16s%2Fg%2F11b7q7ym4v?entry=ttu"},
        { brandName: "El Corral", logoImage: "/images/El_corral.png", url: "https://www.google.com/maps/place/El+Corral+Ca%C3%B1asgordas/@3.4054148,-76.6097435,13z/data=!4m12!1m2!2m1!1sEl+Corral+cali+rese%C3%B1as!3m8!1s0x8e30a1996b86f4f3:0xd8db365d649c2a56!8m2!3d3.3585746!4d-76.5302658!9m1!1b1!15sChdFbCBDb3JyYWwgY2FsaSByZXNlw7FhcyIFOAGIAQFaGSIXZWwgY29ycmFsIGNhbGkgcmVzZcOxYXOSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F1tgz1mx0?entry=ttu"},
        { brandName: "Subway", logoImage: "/images/Subway.png", url: "https://www.google.com/maps/place/Subway/@3.4260203,-76.5653206,13z/data=!4m12!1m2!2m1!1ssubway+cali+rese%C3%B1as!3m8!1s0x8e30a66515916f6d:0x1cf7205685d62f55!8m2!3d3.4523997!4d-76.5357724!9m1!1b1!15sChRzdWJ3YXkgY2FsaSByZXNlw7FhcyIFOAGIAQFaFiIUc3Vid2F5IGNhbGkgcmVzZcOxYXOSARRmYXN0X2Zvb2RfcmVzdGF1cmFudOABAA!16s%2Fg%2F11c2mcql1x?entry=ttu"},
        { brandName: "King Papa", logoImage: "/images/Kingpapa.png", url: "https://www.google.com/maps/place/KINGPAPA+LIMONAR+-+Salchipaperia/@3.4261899,-76.5653207,13z/data=!4m12!1m2!2m1!1sKingpapa+cali+rese%C3%B1as!3m8!1s0x8e30a111cf78deb5:0xb330f42bd068b55f!8m2!3d3.3979601!4d-76.5459009!9m1!1b1!15sChZLaW5ncGFwYSBjYWxpIHJlc2XDsWFzIgI4AVoYIhZraW5ncGFwYSBjYWxpIHJlc2XDsWFzkgEKcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOQ0xVbHViVFpuUlJBQuABAA!16s%2Fg%2F11lb25sbnt?entry=ttu"},
        { brandName: "Frisby", logoImage: "/images/Frisby.jpg", url: "https://www.google.com/maps/place/Frisby+Los+Cambulos/@3.4263595,-76.5653207,13z/data=!4m12!1m2!2m1!1sFrisby+cali+rese%C3%B1as!3m8!1s0x8e30a6a4806807f7:0x29218a0886e63c9c!8m2!3d3.419245!4d-76.5399161!9m1!1b1!15sChRGcmlzYnkgY2FsaSByZXNlw7FhcyIFOAGIAQFaFiIUZnJpc2J5IGNhbGkgcmVzZcOxYXOSARJjaGlja2VuX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F1pzrl9pnh?entry=ttu"},
        { brandName: "Sandwich Qbano", logoImage: "/images/Qbano.png", url: "https://www.google.com/maps/place/Qbano+Cra+15+Chapinero/@3.4450352,-76.5644624,13z/data=!4m12!1m2!2m1!1sQbano+cali+rese%C3%B1as!3m8!1s0x8e30a655a4c08175:0x38d40af64dcc50a7!8m2!3d3.4447994!4d-76.506006!9m1!1b1!15sChNRYmFubyBjYWxpIHJlc2XDsWFzIgU4AYgBAVoVIhNxYmFubyBjYWxpIHJlc2XDsWFzkgEUZmFzdF9mb29kX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F1vn19ks6?entry=ttu"},
        { brandName: "Little Caesars Pizza", logoImage: "/images/Little_Caesars.png", url: "https://www.google.com/maps/place/Little+Caesars+Av+Roosevelt/@3.4452048,-76.5644625,13z/data=!4m12!1m2!2m1!1sLittle+Caesars+cali+rese%C3%B1as!3m8!1s0x8e30a785f08f5efb:0xace69b9a31d97e84!8m2!3d3.4249379!4d-76.5403587!9m1!1b1!15sChxMaXR0bGUgQ2Flc2FycyBjYWxpIHJlc2XDsWFzIgU4AYgBAVoeIhxsaXR0bGUgY2Flc2FycyBjYWxpIHJlc2XDsWFzkgEQcGl6emFfcmVzdGF1cmFudOABAA!16s%2Fg%2F11s5sg0fpw?entry=ttu"},
        { brandName: "Burger King", logoImage: "/images/Burger-King.jpg", url: "https://www.google.com/maps/place/Burger+King+Chipichape/@3.4453743,-76.5644625,13z/data=!4m12!1m2!2m1!1sBurger+King+cali+rese%C3%B1as!3m8!1s0x8e30a618f82bb8d1:0x41f8c19f53184316!8m2!3d3.4759664!4d-76.5273023!9m1!1b1!15sChlCdXJnZXIgS2luZyBjYWxpIHJlc2XDsWFzIgU4AYgBAZIBFGhhbWJ1cmdlcl9yZXN0YXVyYW504AEA!16s%2Fg%2F1q5bmxvnb?entry=ttu"},
        { brandName: "Alitas Factory", logoImage: "/images/Alitas_factory.jpg", url: "https://www.google.com/maps/place/ALITAS+FACTORY/@3.3847029,-76.5309275,17z/data=!4m8!3m7!1s0x8e30a140487a0f33:0x8a4eaadb4f90cff5!8m2!3d3.3846975!4d-76.5283526!9m1!1b1!16s%2Fg%2F1pzt34np3?entry=ttu"},
        { brandName: "El Gaón", logoImage: "/images/Gaon.jpg", url: "https://www.google.com/maps/place/Ga%C3%B3n+Artesanal+Burger+-+Capri/@3.4147832,-76.563958,14z/data=!4m12!1m2!2m1!1sEl+Gaon+cali+rese%C3%B1as!3m8!1s0x8e30a1650b583917:0x45f222add81a2f13!8m2!3d3.3933304!4d-76.5417711!9m1!1b1!15sChVFbCBHYW9uIGNhbGkgcmVzZcOxYXMiAjgBWhciFWVsIGdhb24gY2FsaSByZXNlw7Fhc5IBFGhhbWJ1cmdlcl9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJsWnkxSU4xQjNFQUXgAQA!16s%2Fg%2F11fkn2v4ww?entry=ttu"},
        { brandName: "Tierra de Todos", logoImage: "/images/TDT.png", url: "https://www.google.com/maps/place/TDT+HAMBURGUESAS+LA+NOVENA/@3.4226189,-76.5661001,13z/data=!4m12!1m2!2m1!1sTierra+de+Todos+cali+rese%C3%B1as!3m8!1s0x8e30a15419986387:0x871be4a210aec57a!8m2!3d3.4000644!4d-76.5442134!9m1!1b1!15sCh1UaWVycmEgZGUgVG9kb3MgY2FsaSByZXNlw7FhcyICOAFaHyIddGllcnJhIGRlIHRvZG9zIGNhbGkgcmVzZcOxYXOSARRoYW1idXJnZXJfcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VObExVMVBZWEJSUlJBQuABAA!16s%2Fg%2F11gf5xx8z4?entry=ttu"},
        { brandName: "Cheers Pizzería", logoImage: "/images/Cheers.jpg", url: "https://www.google.com/maps/place/Cheers+Pizzer%C3%ADa+La+Flora/@3.4227885,-76.5661002,13z/data=!4m12!1m2!2m1!1sCheers+Pizzer%C3%ADa+cali+rese%C3%B1as!3m8!1s0x8e30a8992ee2011d:0x31b490e5e13294bc!8m2!3d3.4880701!4d-76.5219907!9m1!1b1!15sCh5DaGVlcnMgUGl6emVyw61hIGNhbGkgcmVzZcOxYXMiBTgBiAEBWiAiHmNoZWVycyBwaXp6ZXLDrWEgY2FsaSByZXNlw7Fhc5IBEHBpenphX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F11cl_l4z59?entry=ttu"},
        { brandName: "Papa John's Pizza", logoImage: "/images/Papa_John's_Logo.png", url: "https://www.google.com/maps/place/Papa+Johns+Pizza/@3.4229581,-76.5661002,13z/data=!4m12!1m2!2m1!1sPapa+John's+Pizza+cali+rese%C3%B1as!3m8!1s0x8e30a6a3e7553c81:0xfce3e15e0670d628!8m2!3d3.4203813!4d-76.5428038!9m1!1b1!15sCh9QYXBhIEpvaG4ncyBQaXp6YSBjYWxpIHJlc2XDsWFzIgU4AYgBAZIBEHBpenphX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F11ggs72v76?entry=ttu"},
        { brandName: "Presto", logoImage: "/images/presto.jpg", url: "https://www.google.com/maps/place/Presto/@3.4231277,-76.5661002,13z/data=!4m12!1m2!2m1!1sPresto+cali+rese%C3%B1as!3m8!1s0x8e30a7e1f24ffa17:0xa707f7072d70b334!8m2!3d3.472121!4d-76.529123!9m1!1b1!15sChRQcmVzdG8gY2FsaSByZXNlw7FhcyIFOAGIAQFaDSILcHJlc3RvIGNhbGmSAQpyZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5OZURkUE1rdEJFQUXgAQA!16s%2Fg%2F11h_vvzml_?entry=ttu"},
        { brandName: "Salchiburger", logoImage: "/images/Salchiburger.jpg", url: "https://www.google.com/maps/place/Salchiburger/@3.4092893,-76.5941319,13z/data=!4m12!1m2!2m1!1sSalchiburger+cali+rese%C3%B1as!3m8!1s0x8e30a13c6227cb65:0x2f3130aa31205459!8m2!3d3.3883834!4d-76.5172276!9m1!1b1!15sChpTYWxjaGlidXJnZXIgY2FsaSByZXNlw7FhcyICOAFaHCIac2FsY2hpYnVyZ2VyIGNhbGkgcmVzZcOxYXOSARRoYW1idXJnZXJfcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOcGNHWlVlVGRCUlJBQuABAA!16s%2Fg%2F1pzq4rws5?entry=ttu"},
        { brandName: "El Chuzo de Nando", logoImage: "/images/Chuzo_nando.png", url: "https://www.google.com/maps/place/EL+CHUZO+DE+NANDO/@3.4402158,-76.574597,13z/data=!4m12!1m2!2m1!1sEl+chuzo+de+Nando+cali+rese%C3%B1as!3m8!1s0x8e30a1569e8b5395:0x72997bb2febfb2de!8m2!3d3.3994097!4d-76.5446032!9m1!1b1!15sCh9FbCBjaHV6byBkZSBOYW5kbyBjYWxpIHJlc2XDsWFzIgI4AVoYIhZlbCBjaHV6byBkZSBuYW5kbyBjYWxpkgEKcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOc2FIWlFabUpuRUFF4AEA!16s%2Fg%2F1tj92ljq?entry=ttu"},
        { brandName: "Butcher", logoImage: "/images/Butcher.jpg", url: "https://www.google.com/maps/place/Butcher+Norte/@3.4505972,-76.5527513,14z/data=!4m12!1m2!2m1!1sButcher+cali+rese%C3%B1as!3m8!1s0x8e30a746808a9dbb:0xba9af1c9e5d7dbde!8m2!3d3.4808009!4d-76.5231116!9m1!1b1!15sChVCdXRjaGVyIGNhbGkgcmVzZcOxYXMiAjgBWhciFWJ1dGNoZXIgY2FsaSByZXNlw7Fhc5IBCnJlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTXlOVGsyVEhKM1JSQULgAQA!16s%2Fg%2F11gxnv5wqy?entry=ttu"},
        { brandName: "NK Burger", logoImage: "/images/NK.jpg", url: "https://www.google.com/maps/place/NK+Burger/@3.4408361,-76.5481685,15z/data=!4m12!1m2!2m1!1sNK+burger+cali+rese%C3%B1as!3m8!1s0x8e30a738021b8619:0xf6abd7564dd9a365!8m2!3d3.434153!4d-76.544459!9m1!1b1!15sChdOSyBidXJnZXIgY2FsaSByZXNlw7FhcyICOAFaGSIXbmsgYnVyZ2VyIGNhbGkgcmVzZcOxYXOSARRoYW1idXJnZXJfcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSb2JWcElZWFZSUlJBQuABAA!16s%2Fg%2F11tfk_m2z7?entry=ttu"},
        { brandName: "Burger Stack", logoImage: "/images/Stack.jpg", url: "https://www.google.com/maps/place/Burger+Stack+Valle+de+Lili/@3.3959366,-76.5750836,13z/data=!4m12!1m2!2m1!1sBurger+Stack+cali+rese%C3%B1as!3m8!1s0x8e30a113d6769a9d:0x56d2302a727e5b!8m2!3d3.3773615!4d-76.5199814!9m1!1b1!15sChpCdXJnZXIgU3RhY2sgY2FsaSByZXNlw7FhcyICOAFaHCIaYnVyZ2VyIHN0YWNrIGNhbGkgcmVzZcOxYXOSAQpyZXN0YXVyYW50mgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU40ZUdZelpEVkJSUkFC4AEA!16s%2Fg%2F11gds4twms?entry=ttu"},
        { brandName: "Shake Burger", logoImage: "/images/Shake.png", url: "https://www.google.com/maps/place/Shake+Burger/@3.3935335,-76.5743956,14z/data=!4m12!1m2!2m1!1sShake+Burger+cali+rese%C3%B1as!3m8!1s0x8e30a1749435d15b:0xc3d8005b2190e66c!8m2!3d3.3935335!4d-76.5362868!9m1!1b1!15sChpTaGFrZSBCdXJnZXIgY2FsaSByZXNlw7FhcyICOAFaEyIRc2hha2UgYnVyZ2VyIGNhbGmSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11h9g9mxp7?entry=ttu"},
        { brandName: "La Gastro House", logoImage: "/images/Gastro.png", url: "https://www.google.com/maps/place/La+Gastro+House/@3.4579485,-76.5380137,17z/data=!4m8!3m7!1s0x8e30a7573e8a9e9f:0x76affe78381a3502!8m2!3d3.4579431!4d-76.5354388!9m1!1b1!16s%2Fg%2F11s5bz9fgh?entry=ttu"},
        { brandName: "Warner Foods", logoImage: "/images/Warner.jpg", url: "https://www.google.com/maps/place/Warner+Foods/@3.4207588,-76.5643563,13z/data=!4m12!1m2!2m1!1sWarner+Foods+cali+rese%C3%B1as!3m8!1s0x8e30a10dfcf7cad1:0xb73391bc923e9be6!8m2!3d3.37413!4d-76.5201063!9m1!1b1!15sChpXYXJuZXIgRm9vZHMgY2FsaSByZXNlw7FhcyICOAFaHCIad2FybmVyIGZvb2RzIGNhbGkgcmVzZcOxYXOSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F1pzr8m0fl?entry=ttu"},
        { brandName: "Hashtag Food", logoImage: "/images/Hashtag.png", url: "https://www.google.com/maps/place/Hashtag+Food/@3.4020353,-76.5465626,17z/data=!4m8!3m7!1s0x8e30a17f667edf03:0x2060d9cb9afa491a!8m2!3d3.4020299!4d-76.5439877!9m1!1b1!16s%2Fg%2F11jsf834b0?entry=ttu"},
        { brandName: "El Gringo", logoImage: "/images/Gringo.jpg", url: "https://www.google.com/maps/place/El+Gringo+Pe%C3%B1%C3%B3n/@3.4502389,-76.5812381,14z/data=!4m12!1m2!2m1!1sEl+Gringo+cali+rese%C3%B1as!3m8!1s0x8e30a67961ecebfb:0x2ada0e1711409c0!8m2!3d3.4502389!4d-76.5431293!9m1!1b1!15sChdFbCBHcmluZ28gY2FsaSByZXNlw7FhcyIFOAGIAQFaGSIXZWwgZ3JpbmdvIGNhbGkgcmVzZcOxYXOSARNhbWVyaWNhbl9yZXN0YXVyYW504AEA!16s%2Fg%2F11cm0klv6r?entry=ttu"},
      ];

      setCards(obtainedCards);
    };

    fetchCards();
  }, []);

  const filteredCards = cards.filter(card =>
    card.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header onSearchChange={setSearchTerm}/>
      <div className="container mx-auto w-1/2 sm:w-3/4 mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-32">
        {filteredCards.map((card, index) => (
          <Card
            key={index}
            brandName={card.brandName}
            logoImage={card.logoImage}
            url={card.url}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
