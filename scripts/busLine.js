function writeBus130() {
    //define a variable for the collection 130 to create in firebase.
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

        allBusStop.forEach(doc => { //iterate thru each doc
          var description = doc.data().description;    //get unique ID to each bus stop to be used for fetching right image
          let newcard = busStopTemplate.content.cloneNode(true);
  
          //update title and text and image
          newcard.querySelector('.bus-stop-details').innerHTML = description;
  
          //attach to gallery, Example: "buses-go-here"
          document.getElementById(collection + "-go-here").appendChild(newcard);
  
        })
      })
  }
  displayBusStops("130");