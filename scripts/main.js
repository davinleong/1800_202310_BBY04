<<<<<<< HEAD
function sayHello() {
    
}
//sayHello();

console.log("client.js loaded!!!");

function insertNameFromFireStore() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if a user is signed in:
      if (user) {
          // Do something for the currently logged-in user here: 
          console.log(user.uid); //print the uid in the browser console
          console.log(user.displayName);  //print the user name in the browser console
          user_Name = user.displayName;
          //method #1:  insert with html only
          //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
          //method #2:  insert using jquery
          $("#name-goes-here").text(user_Name); //using jquery

      } else {
          // No user is signed in.
      }
  });
}
insertNameFromFireStore(); //run the function



//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logging out user");
    }).catch((error) => {
      // An error happened.
    });
}
=======
function sayHello() {
    
}
//sayHello();

console.log("client.js loaded!!!");

function insertNameFromFirestore() {
  //check if user is logged in
  firebase.auth().onAuthStateChanged(user => {
    if (user) { //if user logged in
      console.log(user.uid)
      db.collection("users").doc(user.uid).get().then(userDoc => {
        console.log(userDoc.data().name)
        userName = userDoc.data().name;
        console.log(userName)
        document.getElementById("name-goes-here").innerHTML = userName;

      })
    }
  })
}
insertNameFromFirestore();

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logging out user");
    }).catch((error) => {
      // An error happened.
    });
}
>>>>>>> 8730e854924336926ccd15434e7a3138832c0343
