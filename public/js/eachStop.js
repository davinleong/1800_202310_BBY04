
function displayBusStopInformation() {
  //retrieve the document id from the url
  // let params = new URL(window.location.href) //get the url from the searbar
  // let ID = params.searchParams.get("docID");
  // console.log(ID);

  var ID = localStorage.getItem("docID");
  // alert(ID);

  db.collection("busStops").doc(ID).get().then(thisBusStops => {
    busStopsInfo = thisBusStops.data();
    busStopsCode = busStopsInfo.code;
    busStopsName = busStopsInfo.name;

    document.getElementById("busStopName").innerHTML = busStopsName;
    let imgEvent = document.querySelector(".bus-img");
    imgEvent.src = "/images/" + busStopsCode + ".jpg";
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

function toggleBookmark() {
  var currentUser = firebase.auth().currentUser; 
  currentUser.get().then(userDoc => {
      var bookmarks = userDoc.data().bookmarks;
      var iconID = 'save-' + busDocID;
      if (bookmarks.includes(busDocID)) {
          currentUser.update({
              bookmarks: firebase.firestore.FieldValue.arrayRemove(busDocID)
          }).then(function () {
              console.log("Bookmark removed for: " + currentUser);
              document.getElementById(iconID).innerText = 'bookmark_border';
          });
      } else {
          currentUser.set({
              bookmarks: firebase.firestore.FieldValue.arrayUnion(busDocID)
          }, {
              merge: true
          }).then(function () {
              console.log("Bookmark added for: " + currentUser);
              document.getElementById(iconID).innerText = 'bookmark';
          });
      }
  });
}
