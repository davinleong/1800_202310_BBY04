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

function displayBusStopInformation() {
  //retrieve the document id from the url
  let params = new URL(window.location.href) //get the url from the searbar
  let docID = params.searchParams.get("docID");
  console.log(docID);

  db.collection("busStops").doc(docID).get().then(thisBusStops => {
    busStopsInfo = thisBusStops.data();
    busStopsCode = busStopsInfo.code;
    busStopsName = busStopsInfo.name;

    document.getElementById("busStopsName").innerHTML = busStopsName;
    let imgEvent = document.querySelector(".bus-img");
    imgEvent.src = "../images/" + busStopsCode + ".jpg";
    //newcard.querySelector('i').id = 'save-' + docID;
    document.getElementById("bookmark").id = 'save-' + docID;
    // this line will call a function to save the hikes to the user's document             
    //newcard.querySelector('i').onclick = () => toggleBookmark(docID);
    document.getElementById("save-"+docID).onclick = () => toggleBookmark(docID);
    //Ensure that the bookmark displays correctly as filled

    //if it is already in the favourites
    if (!doAll()) {
      return;
    } else {
      currentUser.get().then(userDoc => {
          //get the user name
          var bookmarks = userDoc.data().bookmarks;
          if (bookmarks.includes(docID)) {
            document.getElementById('save-' + docID).innerText = 'bookmark';
          }
      })   
    }
  })

}
displayBusStopInformation();

function saveBusDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("docID");
  localStorage.setItem('busDocID', ID);
  window.location.href = 'review.html';
}

//Reviews
function populateReviews() {
  let hikeCardTemplate = document.getElementById("reviewCardTemplate");
  let hikeCardGroup = document.getElementById("reviewCardGroup");

  let params = new URL(window.location.href); //get the url from the searbar
  let busID = params.searchParams.get("docID");

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection("reviews")
    .where("busDocID", "==", busID)
    .get()
    .then((allReviews) => {
      reviews = allReviews.docs;
      console.log(reviews);
      reviews.forEach((doc) => {
        var title = doc.data().name;       // get value of the "name" key
        var details = doc.data().details;  // get value of the "details" key
				var busCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
        var busSchedule = doc.data().schedule; //gets the bus schedule
        var docID = doc.id;

        let reviewCard = reviewCardTemplate.content.cloneNode(true);
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-schedule').innerHTML = busSchedule;
        newcard.querySelector('.card-image').src = `./images/${busCode}.jpg`; //Example: BUS01.jpg
        newcard.querySelector('.card-text').innerHTML = details;
        newcard.querySelector('a').href = "eachBus.html?docID="+docID;
        console.log("this card");
        reviewCardGroup.appendChild(reviewCard);
      });
    });
}
populateReviews();

//Bookmark 
function toggleBookmark(busDocId) {
  //alert("Boom!");
  if (!doAll()) {
    alert("Please log in first to gain more access.");
  } else {  
    currentUser.get().then(userDoc => {
      if (userDoc.data().bookmarks !== undefined) {
        var bookmarks = userDoc.data().bookmarks;
        var iconID = "save-" + busDocId;
        if (bookmarks.includes(busDocId)) {
          currentUser.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(busDocId)
          }).then(function () {
              console.log("Bookmark removed for: " + currentUser);
              document.getElementById(iconID).innerText = 'bookmark_border';
          });
        }
        else {  
          currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(busDocId)
          }, {
              merge: true
          }).then(function () {
              console.log("Bookmark added for: " + currentUser);
              document.getElementById(iconID).innerText = 'bookmark';
          });
        }
      } else {
        currentUser.set({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(busDocId)
        }, {
            merge: true
        }).then(function () {
            console.log("Bookmark added for: " + currentUser);
            document.getElementById(iconID).innerText = 'bookmark';
        });
      }
    })
  } 

  /*currentUser.get().then(userDoc => {
    if (!userDoc.has("bookmarks")) {
    }
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
  });*/
}
