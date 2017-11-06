// Initialize Firebase
var config = {
apiKey: "AIzaSyBM-xtif2hMwSvb3IpGXlMk78KMjnobEeI",
authDomain: "tickettoride-ef43c.firebaseapp.com",
databaseURL: "https://tickettoride-ef43c.firebaseio.com",
projectId: "tickettoride-ef43c",
storageBucket: "",
messagingSenderId: "130697707364"
};

firebase.initializeApp(config);
//Global Variables
var dataRef = firebase.database();
//Initial Values
var train = "";
var city = "";
var ftTime = "00:00";
var freqMin = 0;

// Capture button click

$("#sub-butt").on("click", function(event) {
	event.preventDefault();

	train = $("#Tname").val().trim();
	city = $("#Dest").val().trim();
	ftTime = $("#firstTrain").val().trim();
	freqMin = $("#freq").val().trim();

	console.log("Name from form: ", train);
	console.log("Destination from form: ", city);
	console.log("First arrival from form: ", ftTime);
	console.log("Frequency from form: ", freqMin);

	if (freqMin === "") {
		alert("Please complete the form.");
	} else {
		//push to database
		dataRef.ref().push({
			Tname: train,
			Dest: city,
			firstTrain: ftTime,
			freq: freqMin

		}); //push close
		
		//clear the form after data submission
		$("#Tname").val("");
		$("#Dest").val("");
		$("#firstTrain").val("");
		$("#freq").val("");

	} // if-else close
}); // onclick function close
