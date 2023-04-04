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

var ImageFile;
function listenFileSelect() {
      // listen for file selection
      var fileInput = document.getElementById("mypic-input"); // pointer #1
      const image = document.getElementById("mypic-goes-here"); // pointer #2

			// When a change happens to the File Chooser Input
      fileInput.addEventListener('change', function (e) {
          ImageFile = e.target.files[0];   //Global variable
          var blob = URL.createObjectURL(ImageFile);
          image.src = blob; // Display this image
      })
}
listenFileSelect();

function writeNewsFeed() {
  console.log("inside write NewsFeed");
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
        //var userEmail = userDoc.data().email;
        db.collection("newsFeed")
          .add({
            busDocID: busDocID,
            userID: userID,
            title: Title,
            condition: Condition,
            description: Description,
            flooded: Flooded,
            heavySnow: Heavysnow,
            heat: Heat,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }).then(doc => {
            console.log("1. Post document added!");
            console.log(doc.id);
            uploadPic(doc.id);
        })
      });
    } else {
      console.log("No user is signed in");
      window.location.href = "newsFeed.html";
    }
  });
}

//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
// 
// This function is called AFTER the post has been created, 
// and we know the post's document id.
//------------------------------------------------
function uploadPic(postDocID) {
  console.log("inside uploadPic " + postDocID);
  var storageRef = storage.ref("images/" + postDocID + ".jpg");

  storageRef.put(ImageFile)   //global variable ImageFile
     
                 // AFTER .put() is done
      .then(function () {
          console.log('2. Uploaded to Cloud Storage.');
          storageRef.getDownloadURL()

               // AFTER .getDownloadURL is done
              .then(function (url) { // Get URL of the uploaded file
                  console.log("3. Got the download URL.");

                  // Now that the image is on Storage, we can go back to the
                  // post document, and update it with an "image" field
                  // that contains the url of where the picture is stored.
                  db.collection("newsFeed").doc(postDocID).update({
                          "image": url // Save the URL into users collection
                      })
                       // AFTER .update is done
                      .then(function () {
                          console.log('4. Added pic URL to Firestore.');
                          // One last thing to do:
                          // save this postID into an array for the OWNER
                          // so we can show "my posts" in the future
                          savePostIDforUser(postDocID);
                          window.location.href = "newsFeed.html?busDocID=" + busDocID
                      })
              })
      })
      .catch((error) => {
           console.log("error uploading to cloud storage");
      })
}

//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function savePostIDforUser(postDocID) {
  firebase.auth().onAuthStateChanged(user => {
        console.log("user id is: " + user.uid);
        console.log("postdoc id is: " + postDocID);
        db.collection("users").doc(user.uid).update({
              myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
        })
        .then(() =>{
              console.log("5. Saved to user's document!");
                             // alert ("Post is complete!");
              window.location.href = "eachStop.html";
         })
         .catch((error) => {
              console.error("Error writing document: ", error);
         });
  })
}
