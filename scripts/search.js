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

function writeBus() {
  //define a variable for the collection you want to create in Firestore to populate data
  var busRef = db.collection("Bus Lines");

  busRef.add({
    number: "130",
    description: "Metrotown Station / Kootenay Loop", //replace with your own city?
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "222",
    description: "Metrotown Station / Phibbs Exchange", //replace with your own city?
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "144",
    description: "Metrotown Station / SFU Transit Exchange", //replace with your own city?
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "25",
    description: "Brentwood Station / UBC Exchange", //replace with your own city?
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "430",
    description: "Metrotown Station / Eastbound Cook Rd", //replace with your own city?
    city: "Burnaby",
    province: "BC",
  });
}

function displayBusLines(collection) {
  //let busTemplate = document.getElementById("busLineTemplate");

  db.collection(collection).get()   //the collection called "hikes"
    .then(allBusLine => {
      //var i = 1;  //Optional: if you want to have a unique ID for each hike
      allBusLine.forEach(doc => { //iterate thru each doc
        var number = doc.data().number;       // get value of the "name" key
        var description = doc.data().description;    //get unique ID to each hike to be used for fetching right image
        let newcard = busLineTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.bus-number').innerHTML = number;
        newcard.querySelector('.bus-details').innerHTML = description;

        //Optional: give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery, Example: "hikes-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);

        //i++;   //Optional: iterate variable to serve as unique ID
      })
    })
}
displayBusLines("Bus Lines");

function displayRecentSearches() {
  loginOrNot().then(currentUser => {
    if (currentUser) {
      currentUser.get().then(userDoc => {
        var recentSearch = userDoc.data().recentSearches;

        recentSearch.forEach(busID => {
          //console.log(busID);
          db.collection("busStops").doc(busID).get().then(thisRecentSearch => {
            description = thisRecentSearch.data().name;

            let newcard = recentSearchesTemplate.content.cloneNode(true);
            newcard.querySelector('.recentSearch-number').innerHTML = description;
            newcard.querySelector('.busID').href += "?docID=" + busID;

            document.getElementById("Recent Searches-go-here").appendChild(newcard);
          })
        })
      })
    } else {
      console.log("User hasn't logged in, can't display recent searches");
    }  
  }) 
}
displayRecentSearches();