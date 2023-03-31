var currentUser;

function doAll() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      console.log(user.uid);
      console.log(currentUser);
    } else {
      return false; 
    }
  })
}
doAll();

function playBusStopInformation() {
  //retrieve the document id from the url
  let params = new URL(window.location.href); //get the url from the searbar
  let docID = params.searchParams.get("docID");
  console.log(docID);

  db.collection("busStops")
    .doc(docID)
    .get()
    .then(thisBusStops => {
      console.log(thisBusStops.data()); //debug statement
      busStopsInfo = thisBusStops.data();
      busStopsCode = busStopsInfo.code;
      busStopsName = busStopsInfo.name;
      console.log(busStopsCode, busStopsName); //debug statement

      let busStopsNameEl = document.getElementById("busStopsName");
      if (busStopsNameEl) {
        busStopsNameEl.innerHTML = busStopsName;
      } else {
        console.log("busStopsName element not found"); //debug statement
      }

      let imgEvent = document.querySelector(".bus-img");
      if (imgEvent) {
        imgEvent.src = "../images/" + busStopsCode + ".jpg";
      } else {
        console.log("imgEvent element not found"); //debug statement
      }
    })
    .catch(error => {
      console.log(error); //debug statement
    });
}

playBusStopInformation()

function saveBusDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('busDocID', ID);
  window.location.href = 'newsFeed.html';
}

//News Feed
function populateNewsFeed() {
  let busCardTemplate = document.getElementById("newsFeedCardTemplate");
  let busCardGroup = document.getElementById("newsFeedCardGroup");

  let params = new URL(window.location.href); //get the url from the searbar
  let busID = params.searchParams.get("docID");

  // doublecheck: is your collection called "newsFeed"?
  db.collection("newsFeed")
    .where("busDocID", "==", busID)
    .get()
    .then((allnewsFeed) => {
      newsFeed = allnewsFeed.docs;
      console.log(newsFeed);
      newsFeed.forEach((doc) => {
        var title = doc.data().title;
        var image = doc.data().image; 
        console.log(image);      
        var description = doc.data().description; 
        var condition = doc.data().condition; 
				var flooded = doc.data().flooded;    
        var heavySnow = doc.data().heavySnow; 
        var heat = doc.data().heat; 
        var time = doc.data().timestamp.toDate();

        let newsFeedCard = newsFeedCardTemplate.content.cloneNode(true);
        newsFeedCard.querySelector('.title').innerHTML = title;
        newsFeedCard.querySelector('.card-image').src = image;
        newsFeedCard.querySelector('.description').innerHTML = description;
        newsFeedCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();
        newsFeedCard.querySelector(".condition").innerHTML = `condition: ${condition}`;
        newsFeedCard.querySelector(".flooded").innerHTML = `flooded: ${flooded}`;
        newsFeedCard.querySelector(".heavySnow").innerHTML = `heavySnow: ${heavySnow}`;
        newsFeedCard.querySelector(".heat").innerHTML = `heat: ${heat}`;
        console.log("this card");
        newsFeedCardGroup.appendChild(newsFeedCard);
      });
    });
}
populateNewsFeed();

//Bookmark 
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
