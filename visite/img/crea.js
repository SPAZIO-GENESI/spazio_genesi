import {listaa} from './lista.mjs';
const lista = listaa();

console.log(lista);

let immagini=[];
let descrizioni=[];
let crediti=[];

//let quante = (listaa.listar).length;
//console.log("e="+quante);
let quanto = Object.keys(lista).length;
console.log("o="+quanto);
let quanti = calcolaLunghezza(lista);
console.log("i="+quanti);

function caricalista(lista){
    
        immagini=lista[0];
            console.log (immagini);
        descrizioni=lista[1];
            console.log (descrizioni);
        crediti=lista[2];
            console.log (crediti);
    
    loadImages(immagini, descrizioni, crediti);
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
document.addEventListener('DOMContentLoaded', caricalista);
