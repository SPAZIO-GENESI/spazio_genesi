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

  async function getMatomoVisitors(siteId, period, date, tokenAuth) {
    const url = `https://matomodocker.azurewebsites.net/index.php?module=API&method=VisitsSummary.getVisits&idSite=${siteId}&period=${period}&date=${date}&format=JSON&token_auth=${tokenAuth}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
