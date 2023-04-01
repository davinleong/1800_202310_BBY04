var currentUser;

function loginOrNot() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //if user is logged in, currentUser is referenced from firebase
      currentUser = db.collection("users").doc(user.uid);
      //console.log(user.uid);
    } else {
      return false;
    }
  })
}
loginOrNot();

function playBusStopInformation() {
  //retrieve the document id from the url
  let params = new URL(window.location.href); //get the url from the searbar
  let docID = params.searchParams.get("docID");
  console.log(docID);

  db.collection("busStops").doc(docID).get()
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

      //making the bookmark clickable
      document.getElementById('bookmark').id = "save-" + docID;
      document.getElementById('save-'+docID).onclick = () => toggleBookmark(docID);

      //if user is logged in, display their bookmarks correctly
      if (!loginOrNot()) {
        currentUser.get().then(userDoc => {
          var bookmarks = userDoc.data().bookmarks;
          if (bookmarks.includes(docID)) {
             document.getElementById('save-'+docID).innerText = 'bookmark';
          }
          else {
            document.getElementById('save-'+docID).innerText = 'bookmark_border';
          }
        })
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
function toggleBookmark(busDocId) {
  //console.log("Bookmark is running " + busDocId);
  if (loginOrNot() == false) {
    alert("Please log in first to gain more access.")
  } else {
    currentUser.get().then(userDoc => {
      var iconID = "save-" + busDocId;
      //checks if user has a bookmark field already in their doc
      if (userDoc.data().bookmarks !== undefined) {
        //if yes, reference the bookmarks array from firebase onto bookmark  
        var bookmark = userDoc.data().bookmarks;
        //if bookmark has this bus stop already, remove it in firebase  
        if (bookmark.includes(busDocId)) {           
          currentUser.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(busDocId)
          }).then(function () {
              console.log("Bookmark removed for " + userDoc.data().name);
              document.getElementById(iconID).innerText = 'bookmark_border';
          });
        //otherwise, add the bus stop in in firebase
        } else {  
          currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(busDocId)
          }, {
              merge: true
          }).then(function () {
              console.log("Bookmark added for " + userDoc.data().name);
              document.getElementById(iconID).innerText = 'bookmark';
          });
        }
      //if user does not have a bookmarks field in their doc on firebase,
      //create one and add the bus stop in 
      } else { 
        currentUser.set({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(busDocId)
        }, {
            merge: true
        }).then(function () {
            console.log("Bookmark added for " + userDoc.data().name);
            document.getElementById(iconID).innerText = 'bookmark';
        });
      }
    })
  } 
}
