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
	freqMin = parseInt(freqMin);

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

//firebase event for adding a row to the HTML when 
//the user adds a train.
dataRef.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());
	// store the snapshot into variables
	var chTname = childSnapshot.val().Tname;
	var chDest = childSnapshot.val().Dest;
	var chFtrain = childSnapshot.val().firstTrain;
	var chFreq = childSnapshot.val().freq;

	console.log("chTname: ", chTname);
	console.log("chDest: ", chDest);
	console.log("chFtrain: ", chFtrain);
	console.log("chFreq: ", chFreq);

	//calculate next arrival
	//First time (pushed back 1 year to make sure it is before current time.)
	var firstConvert = moment(chFtrain, "HH:mm").subtract(1, "years");
	console.log("firstConvert: ", firstConvert);
	//Current time
	var currentTime = moment();
	console.log("current time: ", moment(currentTime).format("HH:mm"));
	//Difference between the times
	var timeDiff = moment().diff(moment(firstConvert), "minutes");
	console.log("time difference: ", timeDiff);
	//time apart (Remainder)
	var Remainder = timeDiff % chFreq;
	console.log("Remainder: ", Remainder);
	//minutes until train
	var minutesTil = chFreq - Remainder;
	console.log("minutes until next train: ", minutesTil);
	//next train time
	var nextTrain = moment().add(minutesTil, "minutes");
	console.log("next arrival time: ", moment(nextTrain).format("HH:mm"));

	//Add train data to the table
	$("#train-table > tbody").append("<tr><td>" + chTname + "</td><td>" + chDest + "</td><td>" +
  chFreq + "</td><td>" + nextTrain + "</td><td>" + minutesTil + "</td></tr>");
	

}); //on child_added close