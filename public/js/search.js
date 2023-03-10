function writeBusLines() {
    //define a variable for the collection you want to create in Firestore to populate data
    var busRef = db.collection("Bus Lines");

    busRef.add({
        code: "130",
        name: "Kootenay Loop / Phibbs Exchange", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    busRef.add({
        code: "222",
        name: "Metrotown Station / Phibbs Exchange", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        last_updated: firebase.firestore.Timestamp.serverTimestamp()
    });
    busRef.add({
        code: "144",
        name: "Metrotown Station / SFU", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        last_updated: firebase.firestore.Timestamp.serverTimestamp()
    });
}
writeBusLines;

function displayBusLines(collection) {
    let busTemplate = document.getElementById("busLineTemplate");

    db.collection(collection).get()   //the collection called "hikes"
        .then(allBusLine=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allBusLine.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
				var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = busLineTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.bus-title').innerHTML = title;
                newcard.querySelector('.bus-image').src = `./images/${busCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "search.html?docID="+docID;

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

displayCardsDynamically("Bus Lines");