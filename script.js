function shortu(){
    quales = document.getElementById("link1").value;
    if (quales){
      urls = JSON.parse(Get("https://sentinelle.mappa.asud.net/uss?originalURL="+quales));
      console.log(urls);
      link1 = document.getElementById("link1");
      link1.value =urls.secureShortURL;
    }
  }

  function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
  }