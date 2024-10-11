//import listaa from './bio.json' assert { type: 'json' };

//const lista = [];

async function loadJSON() {
    // Fetch the JSON file
    const response = await fetch('./bio.json');
    // Parse the JSON data
    const lista = await response.json();
    // Return the parsed data
    return lista;
}

// Call the function and log the data
loadJSON().then(lista => {
    console.log(lista);
    let quanto = Object.keys(lista).length;
    console.log("o="+quanto);
    const quante = lista.artisti.length;
    console.log("n="+quante);
//console.log("e="+quante);

});


/*
fetch('./bio.json')
  .then(response => response.json())
  .then(data => {console.log(data)
     //lista = data;
     //let quanto = Object.keys(lista).length;
    //console.log("o="+quanto);
     // Carica le immagini quando la pagina è pronta
    // document.addEventListener('DOMContentLoaded', caricalista(lista));

  })
  .catch(error => console.error('Error loading JSON:', error));
*/








//let quante = (listaa.listar).length;
//console.log("e="+quante);

// let quanti = calcolaLunghezza(lista);
// console.log("i="+quanti);
function countChildNodes(node) {
    if (!node.children) {
        return 0;
    }
    let count = node.children.length;
    for (let child of node.children) {
        count += countChildNodes(child);
    }
    return count;
}

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

