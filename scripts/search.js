var currentUser;

// A function that returns a Promise to check if a user is logged in and 
// resolve with the reference to their document.
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
  //define a variable for the collection "Bus Lines" to create in Firestore to populate data
  var busRef = db.collection("Bus Lines");

  busRef.add({
    number: "130",
    description: "Metrotown Station / Kootenay Loop", 
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "222",
    description: "Metrotown Station / Phibbs Exchange", 
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "144",
    description: "Metrotown Station / SFU Transit Exchange", 
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "25",
    description: "Brentwood Station / UBC Exchange", 
    city: "Burnaby",
    province: "BC",
  });
  busRef.add({
    number: "430",
    description: "Metrotown Station / Eastbound Cook Rd", 
    city: "Burnaby",
    province: "BC",
  });
}

// A function to display bus lines in the HTML page
function displayBusLines(collection) {

  db.collection(collection).get()   //the collection called "Bus Lines"
    .then(allBusLine => {
      
      allBusLine.forEach(doc => { //iterate thru each doc
        var number = doc.data().number;       // get value of the "number" key
        var description = doc.data().description;    //get unique ID to each busLine to be used for fetching right description
        let newcard = busLineTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.bus-number').innerHTML = number;
        newcard.querySelector('.bus-details').innerHTML = description;

        //attach to gallery, Example: "Bus Lines-go-here"
        document.getElementById(collection + "-go-here").appendChild(newcard);
      })
    })
}
// Call the displayBusLines function to display the bus lines
displayBusLines("Bus Lines");

// A function to display recent searches made by the user
function displayRecentSearches() {
  // Check if a user is logged in, and if so, 
  //get their recent searches and display them in the HTML page
  loginOrNot().then(currentUser => { 
    if (currentUser) {
      currentUser.get().then(userDoc => {
        var recentSearch = userDoc.data().recentSearches;

        recentSearch.forEach(busID => {
          db.collection("busStops").doc(busID).get().then(thisRecentSearch => {
            description = thisRecentSearch.data().name;
            console.log(description);

            let newcard = busStopTemplate.content.cloneNode(true);
            newcard.querySelector('.busName').innerHTML = description;
            newcard.querySelector('.busID').href += "?docID=" + busID;

            document.getElementById("recentSearches-go-here").appendChild(newcard);
          })
        })
      })
    } else {
      console.log("User hasn't logged in, can't display recent searches");
    }  
  }) 
}
displayRecentSearches();

//when searched for a street, return any bus stop associated with that street
function displaySearchedBusStop() {   
  let searchValue = document.getElementById("searchValue").value;
  console.log("Hi " + searchValue);

  var busStopRef = firebase.firestore().collection("busStops");

  var busDoc = busStopRef.where("name", ">=", searchValue).where("name", "<=", searchValue + "\uf8ff");
  busDoc.get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log(doc.id);

      db.collection("busStops").doc(doc.id).get().then(thisSearched => {
        let newcard = busStopTemplate.content.cloneNode(true);
        newcard.querySelector('.busName').innerHTML = doc.data().name;
        newcard.querySelector('.busID').href += "?docID=" + doc.id;

        document.getElementById("searched-go-here").appendChild(newcard);    
      })
    })
  })
}
