import {listaa} from './bio.json';
const lista = listaa;

console.log(lista);




//let quante = (listaa.listar).length;
//console.log("e="+quante);
let quanto = Object.keys(lista).length;
console.log("o="+quanto);
// let quanti = calcolaLunghezza(lista);
// console.log("i="+quanti);

function caricalista(lista){
    
        immagini=lista[0];
       //     console.log (immagini);
        descrizioni=lista[1];
        //    console.log (descrizioni);
        crediti=lista[2];
        //    console.log (crediti);
    
    loadImages(immagini, descrizioni, crediti);
}

function loadImages(immagini, descrizioni, crediti) {
    const imageFolder = './'; // Cartella delle immagini
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Estensioni delle immagini
    const carouselInner = document.getElementById('carousel-inner');
    const carouselIndicator = document.getElementById('carousel-indicators');

    // Lista delle immagini (in un vero scenario, questa lista potrebbe essere generata dinamicamente)
    const images = immagini; //['accademiasanluca_benedettibiocca_gbartolomei.jpeg', 'accademiasanluca_bernini.jpeg', 'accademiasanluca_canova.jpeg']; // Sostituisci con i nomi delle tue immagini
    const descr = descrizioni;

    images.forEach((image, index) => {

        const bottone = document.createElement('input');
        bottone.setAttribute('type','button');
        bottone.setAttribute('data-bs-target','#carouselExample');
        bottone.setAttribute('data-bs-slide-to',index);
        bottone.setAttribute('aria-label','Slide '+index);
        bottone.setAttribute('aria-current','true');
        bottone.className = (index === 0 ? ' active' : '');
        carouselIndicator.appendChild(bottone);


        const div = document.createElement('div');
        div.className = 'carousel-item 100-vh ' + (index === 0 ? ' active' : '');
        const img = document.createElement('img');
            img.src = imageFolder + image;
            // img.className = 'd-block 100-vh ';
            img.className = 'd-block w-100';
            // img.style = "max-height: 500px; max-width: 500px; height: auto; width: auto;";
            img.alt = 'Slide ' + (index + 1);
        div.appendChild(img);

        const divtesto = document.createElement('div');
            divtesto.className ="carousel-caption ";

            const di = document.createElement('p');
            const h5text = document.createTextNode(descr[index]);
            di.appendChild(h5text);

            const pcred=document.createElement('p');
            const ptext=document.createTextNode(crediti[index]);
            pcred.appendChild(ptext)

            divtesto.appendChild(di);
            divtesto.appendChild(pcred);
        div.appendChild(divtesto);


        carouselInner.appendChild(div);
    });
}

function calcolaLunghezza(arr) {
    let count = 0;

    function contaElementi(a) {
        for (let i = 0; i < a.length; i++) {
            if (Array.isArray(a[i])) {
                contaElementi(a[i]);
            } else {
                count++;
            }
        }
    }

    contaElementi(arr);
    return count;
}

// Carica le immagini quando la pagina è pronta
document.addEventListener('DOMContentLoaded', caricalista(lista));
