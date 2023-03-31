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
