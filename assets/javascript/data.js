	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAD0J15qtz5LDSLsrm1hBNAoZ4kP0cS_FY",
		authDomain: "stevesonoa-playground.firebaseapp.com",
		databaseURL: "https://stevesonoa-playground.firebaseio.com",
		projectId: "stevesonoa-playground",
		storageBucket: "",
		messagingSenderId: "1052450720326"
	};
	firebase.initializeApp(config);

	// Get a reference to the database service
	var database = firebase.database();

	var p1Wins;
	var p1Losses;
	var p1Name;
	var p1Choice;

	var p2Wins;
	var p2Losses;
	var p2Name;
	var p2Choice;

	var playerTurn;
	var whoAmI = "none";

	var theme = 1;

	// Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function(snapshot) {

    	// Determine which player's turn it is.
    	if(snapshot.val().db_playerTurn !== undefined) {
    		playerTurn = snapshot.val().db_playerTurn;
    	}
    	// If the database doesn't know whose turn it is, create it
    	else {
    		database.ref().update({
    			db_playerTurn: 1
    		});
    	}

		// If db_player1 has a name, display p1Stats
		if(snapshot.val().db_p1Name !== undefined) {
			$("#player1Name").text(snapshot.val().db_p1Name);
			$("#player1LblWins").text("Wins: " + snapshot.val().db_p1Wins);
			$("#player1LblLosses").text("Losses: " + snapshot.val().db_p1Losses);
		}
		// If player 2 just logged out, don't let p1 play yet
		else if(snapshot.val().db_p1Name === undefined && snapshot.val().db_p2Name !== undefined) {
			$("#p2c1").text(" ");
			$("#p2c2").text(" ");
			$("#p2c3").text(" ");
			$("#gameStats").text("Waiting for a new opponent...");
			$("#player1Name").text("Empty Seat");
			$("#player1LblWins").text(" ");
			$("#player1LblLosses").text(" ");
		}
		else {
			$("#player1Name").text("Empty Seat");
			$("#player1LblWins").text(" ");
			$("#player1LblLosses").text(" ");
		}

		// If db_player2 has a name, display p2Stats
		if(snapshot.val().db_p2Name !== undefined) {
			$("#player2Name").text(snapshot.val().db_p2Name);
			$("#player2LblWins").text("Wins: " + snapshot.val().db_p2Wins);
			$("#player2LblLosses").text("Losses: " + snapshot.val().db_p2Losses);
		}
		// If player 1 just logged out, don't let p2 play yet
		else if(snapshot.val().db_p2Name === undefined && snapshot.val().db_p1Name !== undefined) {
			$("#p1c1").text(" ");
			$("#p1c2").text(" ");
			$("#p1c3").text(" ");
			$("#gameStats").text("Waiting for a new opponent...");
			$("#player2Name").text("Empty Seat");
			$("#player2LblWins").text(" ");
			$("#player2LblLosses").text(" ");
		}
		else {
			$("#player2Name").text("Empty Seat");
			$("#player2LblWins").text(" ");
			$("#player2LblLosses").text(" ");
		}

		// if Both players are active
		if(snapshot.val().db_p1Name !== undefined && snapshot.val().db_p2Name !== undefined) {
			// if db_playerTurn === 1
			if(snapshot.val().db_playerTurn === 1) {
				if(whoAmI === "player1") {
					// let player1 choose
					$(".player1Rock").text("Rock");
					$(".player1Paper").text("Paper");
					$(".player1Scissors").text("Scissors");
					$("#gameStats").text("Choose your weapon!");
					$("#p2c1").text(" ");
				}
				else {
					$("#gameStats").text("Waiting for Player 1 to choose");
					$("#p1c1").text(" ");
					$("#p2c1").text(" ");
				}
			}
			// else if db_playerTurn === 2
			else if(snapshot.val().db_playerTurn === 2) {
				if(whoAmI === "player2") {
					// let player2 choose
					$(".player2Rock").text("Rock");
					$(".player2Paper").text("Paper");
					$(".player2Scissors").text("Scissors");
					$("#gameStats").text("Choose your weapon!");
					$("#p1c1").text(" ");
				}
				else {
					$("#gameStats").text("Waiting for Player 2 to choose");
					$("#p1c1").text(" ");
					$("#p2c1").text(" ");
				}
			}
			// else
			else if(snapshot.val().db_playerTurn === 0) {
				// Display all results
				p1Choice = snapshot.val().db_p1Choice;
				p2Choice = snapshot.val().db_p2Choice;
				$("#p1c1").text(p1Choice);
				$("#p2c1").text(p2Choice);

				if(theme === 1) {
					var imgStyle = "3d";
					theme++;
				}
				else if(theme === 2) {
					var imgStyle = "icon";
					theme++;
				}
				else if(theme === 3) {
					var imgStyle = "real";
					theme++;
				}
				else {
					var imgStyle = "bathroom";
					theme = 1;
				}

				$("#p1Image").html('<img src="assets/images/' + imgStyle + p1Choice + '.png" alt="' + p1Choice + '" class="img img-responsive" />');
				$("#p2Image").html('<img src="assets/images/' + imgStyle + p2Choice + '.png" alt="' + p2Choice + '" class="img img-responsive" />');

				// If player 1 wins
				if((p1Choice === "Rock" && p2Choice === "Scissors") || (p1Choice === "Paper" && p2Choice === "Rock") || (p1Choice === "Scissors" && p2Choice === "Paper")) {
					$("#gameStats").text("Player 1 wins!");
					// Only update the database 1 time
					if(whoAmI === "player1") {
						p1Wins = snapshot.val().db_p1Wins;
						p1Wins++;
						p2Losses = snapshot.val().db_p2Losses;
						p2Losses++;
						playerTurn = 3;
						database.ref().update({
							db_p1Wins: p1Wins,
							db_p2Losses: p2Losses,
							db_playerTurn: playerTurn
						});
					}
				}
				// Else if player 2 wins
				else if((p2Choice === "Rock" && p1Choice === "Scissors") || (p2Choice === "Paper" && p1Choice === "Rock") || (p2Choice === "Scissors" && p1Choice === "Paper")) {
					$("#gameStats").text("Player 2 wins!");
					// Only update the database 1 time
					if(whoAmI === "player1") {
						p2Wins = snapshot.val().db_p2Wins;
						p2Wins++;
						p1Losses = snapshot.val().db_p1Losses;
						p1Losses++;
						playerTurn = 3;
						database.ref().update({
							db_p2Wins: p2Wins,
							db_p1Losses: p1Losses,
							db_playerTurn: playerTurn
						});
					}
				}
				// Else (draw)
				else {
					$("#gameStats").text("It's a draw!")
				}
				// setTimeout for 3 seconds & reset playerturn to 1
				setTimeout(resetPlayerTurn, 1000 * 5);
			}
		}

	    // if a new user arrives & no p1, user can become p1
		if(whoAmI === "none" && snapshot.val().db_p1Name === undefined) {
			drawPlayerNameInput("player1");
			resetPlayerTurn();
		}
		// If a new user arrives & p1 exists but no p2, user can become p2
		else if(whoAmI === "none" && snapshot.val().db_p2Name === undefined) {
			drawPlayerNameInput("player2");
			resetPlayerTurn();
		}
		// If both p1 & p2 exist, user can spectate until a spot becomes available
		else if(whoAmI === "none") {
			drawPlayerNameDisplay();
		}

    	// Set the local variable of p1's choice
    	p1Choice = snapshot.val().db_p1Choice;

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

    	// In case of error this will print the error
    	console.log("The read failed: " + errorObject.code);
    });

    // When a user clicks on one of the 3 choices,
	$(document).on("click", ".choice", function() {
		var decision = $(this).attr("data-val");
		//if p1's turn
		if(playerTurn === 1) {
			// playerturn = 2
			playerTurn = 2;
			// update p1 db value
			database.ref().update({
				db_p1Choice: decision,
				db_playerTurn: playerTurn
			});
			$(".player1Rock").text(" ");
			$(".player1Paper").text (" ");
			$(".player1Scissors").text (" ");
		}
		// if p2's turn
		else if(playerTurn === 2) {
			// playerturn = 0
			playerTurn = 0;
			// update p2 db value
			database.ref().update({
				db_p2Choice: decision,
				db_playerTurn: playerTurn
			});
			// player2Rock will be immediately overwritten; to avoid writing in the wrong order, this line isn't needed
			// $(".player2Rock").text(" ");
			$(".player2Paper").text (" ");
			$(".player2Scissors").text (" ");
		}
	});

	// If a user inputs a name & pressed "Play"
	$(document).on("click", ".btnPlayerNameInput", function(event) {
		event.preventDefault();

		playerTurn = 1;

		// If the form was for player 1, set local p1Name & update db_p1Name
		if($(this).attr("id") === "player1") {
			p1Name = $("#playerNameInput").val().trim();
			database.ref().update({
				db_p1Name: p1Name,
				db_p1Wins: 0,
				db_p1Losses: 0,
				db_playerTurn: playerTurn
			});
			
			// Identify which player the user is & draw the player's side of the board
			whoAmI = "player1";
			drawPlayerNameDisplay();
		}
		// If the form was for player 2, do the same
		else if($(this).attr("id") === "player2") {
			p2Name = $("#playerNameInput").val().trim();
			database.ref().update({
				db_p2Name: p2Name,
				db_p2Wins: 0,
				db_p2Losses: 0,
				db_playerTurn: playerTurn
			});

			whoAmI = "player2";
			drawPlayerNameDisplay();
		}
	});

	// Resets the player's turn to 1
	function resetPlayerTurn() {
		database.ref().update({
			db_playerTurn: 1
		});
		$("#p1Image").html(" ");
		$("#p2Image").html(" ");
	}

	// Draws the Player Name Input area if a player's seat is empty
	function drawPlayerNameInput(whichPlayer) {
    	$("#playerIntro").html(
			'<form class="form-inline">'
		+		'<div class="form-group">'
		+			'<input type="text" class="form-control" id="playerNameInput" placeholder="Your Name">'
		+		'</div>'
		+		'<button type="submit" class="btn btn-default btnPlayerNameInput" id="' + whichPlayer + '">Start</button>'
		+	'</form>'
		);
	}

	// Shows the player which seat they're in, or if they're spectating
	function drawPlayerNameDisplay() {
		if(whoAmI === "none") {
			$("#playerIntro").html("You are currently spectating.");
		}
		else if(whoAmI === "player1") {
			$("#playerIntro").html("Hi, " + p1Name + "! You are player 1.");
			$("#p1c1").addClass("player1Rock");
			$("#p1c2").addClass("player1Paper");
			$("#p1c3").addClass("player1Scissors");
		}
		else if(whoAmI === "player2") {
			$("#playerIntro").html("Hi, " + p2Name + "! You are player 2.");
			$("#p2c1").addClass("player2Rock");
			$("#p2c2").addClass("player2Paper");
			$("#p2c3").addClass("player2Scissors");
		}
	}

	$(document).on("click", "#chatSubmit", function(event) {
		event.preventDefault();

		var chatText = $("#inputChatText").val().trim();
		var myName = "Spectator";

		if(whoAmI === "player1") {
			myName = p1Name;
		}
		else if(whoAmI === "player2") {
			myName = p2Name;
		}

		database.ref().push({
			db_chatName: myName,
			db_chatType: whoAmI,
			db_chatText: chatText
		});
		$("#inputChatText").val(" ");
	});

	database.ref().on("child_added", function(snapshot) {
		var chatType = snapshot.val().db_chatType;
		var chatName = snapshot.val().db_chatName;
		var chatText = snapshot.val().db_chatText;


		if(chatType === "player1") {
			$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
		}
		else if(chatType === "player2") {
			$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
		}
		else if(chatType === "none") {
			$("#chatTextArea").prepend(chatName + ": " + chatText + '\r\n');
		}
	});




	// When the user closes the window or tab, their seat becomes available
	$(window).unload(function(){
		// If the player is p1, reset the p1 DB values
		if(whoAmI === "player1") {
			database.ref().update({
				db_p1Name: null,
				db_p1Wins: 0,
				db_p1Losses: 0
			});


		}
		// If the player is p2, reset the p2 DB values
		else if(whoAmI === "player2") {
			database.ref().update({
				db_p2Name: null,
				db_p2Wins: 0,
				db_p2Losses: 0
			});
		}
		// Do *NOT* end with a simple "else" because if a spectator leaves, no other action is necessary
	});