function writeBusStops() {
    //define a variable for the collection you want to create in Firestore to populate data
    var busRef = db.collection("busStops");

    busRef.add({
        code: "BUS01",
        name: "Dunbar Loop @ Bay 6", 
        schedule: "Every 5min",
        city: "Vancouver",
        province: "BC",
        details: "No brench, no shade, accessiblity",
        //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 07, 2023"))
    });
    busRef.add({
        code: "BUS02",
        name: "UBC Exchange @ Bay 10", 
        schedule: "Every 15min",
        city: "Vancouver",
        province: "BC",
        details: "Heating system installed on brenchs, Full cover",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2023"))
    });
    busRef.add({
        code: "BUS03",
        name: "Stanley Park Dr @ Pipeline Rd", 
        schedule: "Every 30min",
        city: "Vancouver",
        province: "BC",
        details: "Broken brench",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 10, 2023"))
    });
}
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("busCardTemplate");

    db.collection(collection).get()   //the collection called "hikes"
        .then(allStops=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allStops.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
				var busCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var busSchedule = doc.data().schedule; //gets the bus schedule
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-schedule').innerHTML = busSchedule;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${busCode}.jpg`; //Example: BUS01.jpg
                newcard.querySelector('a').href = "eachBus.html?docID="+docID;
                console.log("this card");
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "bus-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("busStops");  //input param is the name of the collection