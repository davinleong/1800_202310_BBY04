var currentUser;

function loginOrNot() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //if user is logged in, currentUser is referenced from firebase
        resolve(currentUser = db.collection("users").doc(user.uid));
      }
    })
  })
}
loginOrNot();

function playBusStopInformation() {
  let params = new URL(window.location.href); //get the url from the searbar
  let docID = params.searchParams.get("docID"); //retrieve the document id from it
  //console.log(docID);

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
      if (currentUser) {
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
    addToRecentSearches(docID);
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

//Bookmark toggle
function toggleBookmark(busDocId) {
  //console.log("Bookmark is running " + busDocId);
  if (!currentUser) {
    alert("Please log in first to gain more access.")
  } else {
    currentUser.get().then(userDoc => {
      var iconID = "save-" + busDocId;      
      var bookmark = userDoc.data().bookmarks;
      //if user has the bus id on firebase already, remove it      
      if (bookmark.includes(busDocId)) { 
        currentUser.update({
          bookmarks: firebase.firestore.FieldValue.arrayRemove(busDocId)
        }).then(function () {
            console.log("Bookmark removed for " + userDoc.data().name);
            document.getElementById(iconID).innerText = 'bookmark_border';
        });
      //otherwise, add the bus id in in firebase
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

function addToRecentSearches(busDocId) {
  loginOrNot().then(currentUser => {
    if (!currentUser) {
      console.log("User is not logged in, can't add to recent search");
    } else {  
      currentUser.get().then(userDoc => {
        //add the recently-searched bus stop in firebase  
        currentUser.set({
          recentSearches: firebase.firestore.FieldValue.arrayUnion(busDocId)
        }, {
          merge: true
        }).then(function () {
          console.log("Added to recent searches for " + userDoc.data().name);
        })
      }).then(() => {
        currentUser.get().then(userDoc => {
          var recentSearch = userDoc.data().recentSearches || [];
          console.log(recentSearch.length + " recent searches");
          //if more than 3 recent searches exist, remove the oldest one
          if (recentSearch.length > 3) {
            currentUser.update({
              recentSearches: firebase.firestore.FieldValue.arrayRemove(recentSearch[0])
            }).then(function () {
              console.log("Removed oldest ID " + recentSearch[0]);
            });
          }
        })
      })  
    }
  }) 
}
