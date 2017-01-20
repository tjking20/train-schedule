$("document").ready(function(){

  var config = {
    apiKey: "AIzaSyAcFcW2oOOHzKX49Y_UDqsE3YjjVzyLA8w",
    authDomain: "train-schedule-33fba.firebaseapp.com",
    databaseURL: "https://train-schedule-33fba.firebaseio.com",
    storageBucket: "train-schedule-33fba.appspot.com",
    messagingSenderId: "976849747200"
  };
  firebase.initializeApp(config);


  var database = firebase.database();
  var trainName = $("#tname");
  var trainDestination = $("#tdest");
  var firstTrain = $("#tfirst");
  var trainFrequency = $("#tfreq");

  $(document).on("click","#submitBtn", function(){
	
	//sends the following values to firbase
	database.ref().push({

		//following variable values are capotured, and white space is trimmed.
		name: trainName.val().trim();
		destination: trainDestination.val().trim();
		first: firstTrain.val().trim();
		frequency: trainFrequency.val().trim();

	 });

	trainName.val("");
	trainDestination.val("");
	firstTrain.val("");
	trainFrequency.val("");

  });
  


  database.ref().on("child_added", function(snapshot){



  });








});//end doc.ready