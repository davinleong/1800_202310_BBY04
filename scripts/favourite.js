function writeBusStops() {
    //define a variable for the collection you want to create in Firestore to populate data
    var busRef = db.collection("busStops");

    busRef.add({
        city: "Vancouver",
        code: "50298",
        details: "No brench, no shelter, accessiblity",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 07, 2023")),
        lat: "49.235129",
        lng: "-123.185234",
        name: "Dunbar Loop @ Bay 6", 
        province: "BC",
        schedule: "Every 5min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Vancouver",
        code: "61701",
        details: "Heating system installed on brenchs, Full cover",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2023")),
        lat: "49.26581",
        lng: "-123.248129",
        name: "UBC Exchange @ Bay 10", 
        province: "BC",
        schedule: "Every 15min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Vancouver",
        code: "51447",
        details: "Broken bench",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 10, 2023")),
        lat: "49.240075",
        lng: "-122.965534",
        name: "Westbound Canada Way @ Sperling Ave", 
        province: "BC",
        schedule: "Every 30min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Vancouver",
        code: "51370",
        details: "Full shelter",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2023")),
        lat: "49.289898",
        lng: "-123.128771",
        name: "Eastbound W Pender St @ Nicola St", 
        province: "BC",
        schedule: "Every 5min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Burnaby",
        code: "51999",
        details: "Heavy traffics",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 07, 2023")),
        lat: "49.226002",
        lng: "-123.002615",
        name: "Metrotown Station @ Bay", 
        province: "BC",
        schedule: "Every 9min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Burnaby",
        code: "52103",
        details: "Black iced",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 23, 2023")),
        lat: "49.265602",
        lng: "-123.022312",
        name: "Eastbound Lougheed Hwy @ Boundary Rd", 
        province: "BC",
        schedule: "Every 7min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Burnaby",
        code: "52577",
        details: "Night bus, Operate between 12AM to 5AM",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 07, 2023")),
        lat: "49.241534",
        lng: "-122.995717",
        name: "Westbound Deer Lake Parkway @ Garden Grove Dr", 
        province: "BC",
        schedule: "Every 45min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Coquitlam",
        code: "53045",
        details: "Full covered shelter",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 23, 2023")),
        lat: "49.263283",
        lng: "-122.823035",
        name: "Westbound Como Lake Ave @ 2500 Block", 
        province: "BC",
        schedule: "Every 5min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "North Vancouver",
        code: "54133",
        details: "No Shelter, no bench, no cover, no time-table",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 07, 2023")),
        lat: "49.310719",
        lng: "-122.99518",
        name: "Southbound Plymouth Dr @ McCartney Close", 
        province: "BC",
        schedule: "Every 5min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });
    busRef.add({
        city: "Port Moody",
        code: "53255",
        details: "No Bench, No shelter",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 07, 2023")),
        lat: "49.299217",
        lng: "-122.865033",
        name: "Eastbound Ioco Rd @ Alderside Rd", 
        province: "BC",
        schedule: "Every 5min",
         //last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time 
    });

}
//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            getBookmarks(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

			// Get the Array of bookmarks
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);
						
			// Get pointer the new card template
            let newcardTemplate = document.getElementById("favCardTemplate");

			// Iterate through the ARRAY of bookmarked hikes (document ID's)
            bookmarks.forEach(thisBusID => {
                console.log(thisBusID);
                db.collection("busStops").doc(thisBusID).get().then(doc => {
                    var title = doc.data().name; // get value of the "name" key
                    var details  = doc.data().details ; //get unique ID to each hike to be used for fetching right image
                    var busSchedule  = doc.data().schedule ; //gets the length field
                    var docID = doc.id;  //this is the autogenerated ID of the document
                    
                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                    newcard.querySelector('.card-schedule').innerHTML = busSchedule;
                    newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('.card-image').src = `./images/${busCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector('a').href = "eachStop.html?docID=" + docID;

                    //NEW LINE: update to display length, duration, last updated
                    newcard.querySelector('.card-length').innerHTML =
                        "title: " + doc.data().title +
                        "Schedule: " + doc.data().busSchedule +
                        "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

					//Finally, attach this new card to the gallery
                    favCardTemplate.appendChild(newcard);
                })
            });
        })
}
