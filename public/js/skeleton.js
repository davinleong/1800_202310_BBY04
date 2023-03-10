//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here.
      console.log($("#navbarPlaceholder").load("/postlogin"));
      console.log($("#footerPlaceholder").load("/footer"));
    } else {
      // No user is signed in.
      console.log($("#navbarPlaceholder").load("/prelogin"));
      console.log($("#footerPlaceholder").load("/footer"));
    }
  });
}
loadSkeleton(); //invoke the function
