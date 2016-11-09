  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCPXA_-IeD7FhaLzyl4nH5u4lTopwYLR7Q",
    authDomain: "homework-7-56cd3.firebaseapp.com",
    databaseURL: "https://homework-7-56cd3.firebaseio.com",
    storageBucket: "homework-7-56cd3.appspot.com",
    messagingSenderId: "601433292418"
};
  firebase.initializeApp(config);

  var database = firebase.database();

$('#trainSubmit').on('click', function() {
	var name = $('#trainName').val().trim();
	var destination = $('#trainDest').val().trim();
	var firstTrain = $('#trainFirst').val().trim();
	console.log(firstTrain);
	var frequency = $('#trainFreq').val().trim();
	// push data to the server.
	database.ref().push({
		name: name,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
		// firebase.database.ServerValue.TIMESTAMP
	})
	// don't refresh the entire page.
	return false;
})

database.ref().on("child_added", function(childSnapshot) {
	var newRow = $('<tr>');
	var newName = $('<td>').text(childSnapshot.val().name);
	newRow.append(newName);

	var newDestination = $('<td>').text(childSnapshot.val().destination);
	newRow.append(newDestination);

	var newFrequency = $('<td>').text(childSnapshot.val().frequency);
	newRow.append(newFrequency);
	// takes time difference from first train to now.
	// train time.
	var nextTrainTime = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;
	// console.log(frequency)
	var timeDifference = moment(nextTrainTime, 'HHmm').diff(moment())/1000/60;
	//while that difference is negative
	while(timeDifference <= 0) {
		// add frequency to the time to get time of the next train.
		nextTrainTime = (moment(nextTrainTime, 'HHmm').add(frequency,'minutes').format('HHmm'));
		// take difference of that train time with now.
		timeDifference = moment(nextTrainTime, 'HHmm').diff(moment())/1000/60;
	}
	// display this time and how far it is from now in table.
	var displayTime = (moment(nextTrainTime, 'HHmm').format('h:mm a'));
	var newNextArrival = $('<td>').text(displayTime);
	newRow.append(newNextArrival);
	var newTimeDifference = $('<td>').text(Math.floor(timeDifference));
	newRow.append(newTimeDifference);

	
$('#tableBody').append(newRow);
 }), function (errorObject) {
// Create Error Handling
console.log("The read failed: " + errorObject.code);
}


