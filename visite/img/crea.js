//import * as listam from './lista.mjs';
const listam = require('./lista.mjs');

let immmagini=[];
let descrizioni=[];
let crediti=[];
let quante = listam.listaa.length;
console.log("e="+quante);
let quanto = Object.keys(listam.listaa).length;
console.log("o="+quanto);

function caricalista(lista){

    for (let x=0; x<quante; x++) {
        immmagini.push(lista(0,x));
            console.log (immmagini(x));
        descrizioni.push(lista(1,x));
            console.log (descrizioni(x));
        crediti.push(lista(2,x));
            console.log (crediti(x));
    }
    loadImages(immmagini, descrizioni, crediti);
}

function loadImages(immagini, descrizioni, crediti) {
    const imageFolder = './'; // Cartella delle immagini
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Estensioni delle immagini
    const carouselInner = document.getElementById('carousel-inner');

    // Lista delle immagini (in un vero scenario, questa lista potrebbe essere generata dinamicamente)
    const images = immmagini; //['accademiasanluca_benedettibiocca_gbartolomei.jpeg', 'accademiasanluca_bernini.jpeg', 'accademiasanluca_canova.jpeg']; // Sostituisci con i nomi delle tue immagini

    images.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = imageFolder + image;
        // img.className = 'd-block 100-vh ';
        img.style = "max-height: 500px; max-width: 500px; height: auto; width: auto;";
        img.alt = 'Slide ' + (index + 1);
        div.appendChild(img);
        carouselInner.appendChild(div);
    });
}

// Carica le immagini quando la pagina è pronta
document.addEventListener('DOMContentLoaded', caricalista);
