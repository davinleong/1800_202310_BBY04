function writeBus130() {
    //define a variable for the collection you want to create in Firestore to populate data
    var busRef = db.collection("130");
  
    busRef.add({
      description: "Metrotown Station @ Bay 4",
    });
    busRef.add({
      description: "Northbound Willingdon Ave @ Central Blvd", 
    });
    busRef.add({
      description: "Northbound Willingdon Ave @ Kingsborough St", 
    });
    busRef.add({
      description: "Northbound Willingdon Ave @ Grafton St",
    });
    busRef.add({
      description: "Northbound Willingdon Ave @ Bond St", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Burke St",
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Grassmere St", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Price St", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Deer Lake Parkway",
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Sanderson Way", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Goard Way",
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Canada Way", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Still Creek Dr", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Juneau St",
    });
    busRef.add({
        description: "Brentwood Station @ Bay 1", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Midlawn Dr",
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ William St", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Parker St", 
    });
    busRef.add({
        description: "Northbound Willingdon Ave @ Georgia St",
    });
    busRef.add({
        description: "Westbound Hastings St @ Willingdon Ave", 
    });
    busRef.add({
        description: "Westbound Hastings St @ Madison Ave",
    });
    busRef.add({
        description: "Westbound Hastings St @ Gilmore Ave", 
    });
    busRef.add({
        description: "Westbound Hastings St @ Ingleton Ave", 
    });
    busRef.add({
        description: "Westbound Hastings St @ Esmond Ave",
    });
    busRef.add({
        description: "Kootenay Loop @ Bay 4", 
    });
  }
  
  function displayBusStops(collection) {
    let buStopTemplate = document.getElementById("busStopTemplate");
  
    db.collection(collection).get()   //the collection called "busStops"
      .then(allBusStop => {
        //var i = 1;  //Optional: if you want to have a unique ID for each bus stop
        allBusStop.forEach(doc => { //iterate thru each doc
          var description = doc.data().description;    //get unique ID to each bus stop to be used for fetching right image
          let newcard = busStopTemplate.content.cloneNode(true);
  
          //update title and text and image
          newcard.querySelector('.bus-stop-details').innerHTML = description;
  
          //Optional: give unique ids to all elements for future use
          // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
          // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
          // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
  
          //attach to gallery, Example: "buses-go-here"
          document.getElementById(collection + "-go-here").appendChild(newcard);
  
          //i++;   //Optional: iterate variable to serve as unique ID
        })
      })
  }
  displayBusStops("130");