function writeBus() {
  //define a variable for the collection you want to create in Firestore to populate data
  var busRef = db.collection("Bus Lines");

  busRef.add({
    number: "130",
    description: "Kootenay Loop / Phibbs Exchange", //replace with your own city?
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
    description: "Metrotown Station / SFU", //replace with your own city?
    city: "Burnaby",
    province: "BC",
  });
}

function displayBusLines(collection) {
  let busTemplate = document.getElementById("busLineTemplate");

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