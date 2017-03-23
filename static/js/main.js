requirejs(['jquery','tether','bootstrap','googleSignIn','login'], function(jquery, tether, bootstrap, googleSignIn, login){
  console.log("Require Loaded");

  login.initialize();
});
