async function loadJSON() {
    // Fetch the JSON file
    const response = await fetch('./bio.json');
    // Parse the JSON data
    const lista = await response.json();
    // Return the parsed data
    return lista;
}

loadJSON().then(lista => {
    console.log(lista);
    const quante = lista.artisti.length;
    console.log("n="+quante);
   cycleAndRenderImages(lista, "névoanarua");
});

function cycleAndRenderImages(jsonData, personName) {
    let numimg = 0;
    jsonData.artisti.forEach(artist => {
        if (artist.nome === personName) {
            let cartella = artist.cartella;
            const di = document.createElement('p');
            const bio = document.createTextNode(artist.bio);
            di.appendChild(bio);
            document.getElementById("bio").appendChild(bio);

            artist.img.forEach(imgGroup => {
                Object.values(imgGroup).forEach(images => {
                    images.forEach(image => {
                        numimg += 1;
                        console.log("processo " + numimg);
                        renderImage(image, numimg, artist);
                    });
                });
            });
        }
    });
}

function renderImage(image, numimg, artist) {
    console.log(artist);
    const imgElement = document.createElement('img');
    imgElement.src = "./"+artist.cartella+"/"+image.img;
    imgElement.style.width = "100px";
    imgElement.alt = image.des;
    console.log(image);
    console.log("img"+numimg);
    document.getElementById('img'+numimg).appendChild(imgElement);
}

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

