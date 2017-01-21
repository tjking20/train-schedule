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
  var trainName = $("#train-name");
  var trainDestination = $("#train-destination");
  var firstTrain = $("#first-train");
  var trainFrequency = $("#train-frequency");
  var currentTime = moment().format("LT");

  $("#time").html(currentTime);

  $(document).on("click","#submitBtn", function(){


	//sends the following values to firbase
	database.ref().push({

		//following variable values are captured, and white space is trimmed.
		trainName: trainName.val().trim(),
		trainDestination: trainDestination.val().trim(),
		firstTrain: firstTrain.val().trim(),
		trainFrequency: trainFrequency.val().trim()

	});

	//empties the text field dynamically
	trainName.val("");
	trainDestination.val("");
	firstTrain.val("");
	trainFrequency.val("");

	return false;

  });


  	//capture current snapshot of data
	database.ref().on("child_added", function(data){
		// console.log(data.val());
		console.log(data.val().trainName)//this is the correct syntax to use for later

		
		var beginTime = data.val().firstTrain;
		var converter = moment(beginTime,"hh:mm");
		var diffTime = moment().diff(moment(converter), "minutes");
		var remainder = diffTime % data.val().trainFrequency;
		var trainArrival = data.val().trainFrequency - remainder;
		var nextTrainRaw = moment().add(trainArrival, "minutes");
		var nextTrain = moment(nextTrainRaw).format("hh:mm");

		$("#schedule").append("<tr><td>"+(data.val().trainName)+"</td><td>"+(data.val().trainDestination)+
		"</td><td>"+(data.val().trainFrequency)+"</td><td>"+nextTrain+"</td><td>"+trainArrival+"</td></tr>");

	

	});




	console.log("working")




  

});//end doc.ready

