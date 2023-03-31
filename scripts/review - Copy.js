var busDocID = localStorage.getItem("busDocID"); //visible to all functions on this page
function getBusName(id) {
  db.collection("busStops")
    .doc(id)
    .get()
    .then((thisBus) => {
      var busName = thisBus.data().name;
      document.getElementById("busName").innerHTML = busName;
    });
}

getBusName(busDocID);

function writeReview() {
  console.log("inside write review");
  let Title = document.getElementById("title").value;
  let Description = document.getElementById("description").value;
  let Condition = document.getElementById("condition").value;
  let Flooded = document.querySelector('input[name="flooded"]:checked').value;
  let Heavysnow = document.querySelector('input[name="heavysnow"]:checked').value;
  let Heat = document.querySelector('input[name="heat"]:checked').value;
  
  console.log(Title, Description, Condition, Flooded, Heavysnow, Heat);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        db.collection("reviews")
          .add({
            busDocID: busDocID,
            userID: userID,
            title: Title,
            condition: Condition,
            description: Description,
            flooded: Flooded,
            HeavySnow: Heavysnow,
            Heat: Heat,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            window.location.href = "thanks.html"; //new line added
          });
      });
    } else {
      console.log("No user is signed in");
      window.location.href = "review.html";
    }
  });
}
