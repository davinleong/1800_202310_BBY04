function displayBusStopInformation() {
  //retrieve the document id from the url
  let params = new URL(window.location.href) //get the url from the searbar
  let ID = params.searchParams.get("docID");
  console.log(ID);

  db.collection("busStop").doc(ID).get().then(thisBusStop => {
    busStopInfo = thisBusStop.data();
    busStopCode = busStopInfo.code;
    busStopName = busStopInfo.name;

    document.getElementById("busStopName").innerHTML = busStopName;
    let imgEvent = document.querySelector(".bus-img");
    imgEvent.src = "../images/" + busCode + ".jpg";
  }

  )

}
displayBusStopInformation();

function saveBusDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('busDocID', ID);
  window.location.href = 'feed.html';
}