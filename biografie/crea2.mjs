const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const quale = urlParams.get('artista');
console.log(quale);

document.addEventListener('DOMContentLoaded', function() {
    loadJSON().then(lista => {
        console.log('JSON loaded:', lista);
        cycleAndRenderImages(lista, quale);
        var metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:image');
        metaTag.setAttribute('content', 'test'); 
        document.getElementsByTagName('head')[0].appendChild(metaTag);
       // document.head.appendChild(metaTag);
    }).catch(error => {
        console.error('Error loading JSON:', error);
    });
});

async function loadJSON() {
    // Fetch the JSON file
    const response = await fetch('./bio.json');
    // Parse the JSON data
    const lista = await response.json();
    // Return the parsed data
    return lista;
};

function cycleAndRenderImages(jsonData, personName) {
    let numimg = 0;
    jsonData.artisti.forEach(artist => {
        if (artist.cartella === personName) {
            let cartella = artist.cartella;

            // GENERAZIONE OG
            const title = encodeURIComponent(document.title);
            const description = encodeURIComponent("Biografia Artista "+ artist.nome);
            const imageUrl = encodeURIComponent("https://spaziogenesi.org/biografie/" +artist.cartella +"/"+ artist.img[0]["1"][0]["img"] );
            //template settings
            const templateId = 'e4b8c678-7bd5-445d-ba03-bfaad510c686';
            const versionNumber = 4;
            const templateURL = `https://ogcdn.net/${templateId}/v${versionNumber}/spaziogenesi.org/${title}/${description}/${imageUrl}/og.png`;

            var metaTag = document.createElement('meta');
            // Set the attributes for the meta tag
            metaTag.setAttribute('property', 'og:image');
            metaTag.setAttribute('content', templateURL); // Replace with your image URL

           // document.getElementsByTagName('head')[0].appendChild(metaTag);
            document.head.appendChild(metaTag);
            console.log(metaTag);
       

            const nome = document.createTextNode("Bio : "+ artist.nome);
            document.getElementById("biotit").appendChild(nome);

            /*const di = document.createElement('p');
            const bio = document.createTextNode(artist.bio);
            di.appendChild(bio);
            document.getElementById("bio").appendChild(di);*/
            document.getElementById("bio").innerHTML = artist.bio;
            // p di appoggio per gli ulteriori oggetti
            const pi = document.createElement('p');
            pi.className = "regdiv";
            pi.id="pidiv";
            document.getElementById("bio").appendChild(pi);
            const pi2 = document.createElement('p');
            pi2.className = "regdiv";
            pi2.id="pidiv2";
            document.getElementById("bio").appendChild(pi2);
            if (artist.IG){
                const igurl = document.createElement('a');
                igurl.href = "https://www.instagram.com/"+artist.IG;
                igurl.innerHTML = "Instagram @"+artist.IG;
                igurl.target = "_new";
                document.getElementById("pidiv2").appendChild(igurl);
            }
            if (artist.social){
                const socurl = document.createElement('a');
                socurl.href = artist.social;
                socurl.innerHTML = artist.social;
                socurl.className = "regdiv";
                document.getElementById("pidiv").appendChild(socurl);
            }

            if (artist.portfolio){
                const socurl = document.createElement('a');
                socurl.href = "./" + artist.cartella + "/" + artist.portfolio;
                socurl.innerHTML = artist.portfolio;
                socurl.className = "regdiv";
                document.getElementById("pidiv").appendChild(socurl);
            }


            artist.img.forEach(imgGroup => {
                Object.values(imgGroup).forEach(images => {
                    images.forEach(image => {
                        numimg += 1;
                        renderImage(image, numimg, artist);
                    });
                });
            });
        }
    });
};

function renderImage(image, numimg, artist) {
   // console.log(artist);
    const imgElement = document.createElement('img');
    if (image.img){
        imgElement.src = "./"+artist.cartella+"/"+image.img;
        // imgElement.style.width = "100px";
        imgElement.className="img-fluid ";
        imgElement.alt = image.des;
        //console.log(image);
      console.log("img"+numimg);
        document.getElementById('img'+numimg).appendChild(imgElement);

        const di = document.createElement('p');
        di.className = "regdiv";
        di.innerHTML = image.deslunga;
        
        document.getElementById('img'+numimg).appendChild(di);
        //document.getElementById('img'+numimg).innerHTML = image.des;
    }
};






