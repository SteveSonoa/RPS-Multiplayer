# An Introduction to Rock Paper Scissors - Multiplayer!
Battle against your friends in a war that has been ongoing for generations - Rock, Paper, Scissors! Each player picks a side, trash talks the other in the chat, then chooses a weapon. Who will win? Only time will tell!

### How does it work?
RPS uses [Google Firebase](https://firebase.google.com/) to store the game's state, so it always knows when a player is present and when one is needed. Any other participants that load the page when Player 1 & Player 2 are defined get to spectate and join in the chat anonymously.

Wins and losses are stored on Firebase, but they will reset when the user logs out. The chat function remembers everything, so you can return to your conversation later if you wish.

### Who will use this?
Rock, Paper, Scissors is genuinely one of the most popular games throughout modern history. Since a computer and an Internet connection make everything better, this will clearly appeal to at least 87% of the world's population, by the most recent estimates.

### What is the goal?
This was my first experience with both Firebase and NoSQL, so the goal was familiarity with the technologies. While I would certainly set it up differently today, I'm quite happy with how this first attempt ended up.

# Deployment
The code can be used in most web servers; there is no required node or MySQL requirement. You will need to setup a Firebase account, then update root/assets/javascript/data.js with your own Firebase initialization code:

```
// Initialize Firebase
var config = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-FIREBASE-DOMAIN",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-MESSAGING-ID"
};
firebase.initializeApp(config);

var database = firebase.database();
```

# Screenshot
![Screenshot](http://www.fullstacksteve.com/wp-content/uploads/2017/12/hero-rps.png)

# Credits
Steve Marshall, Sole Developer
* [Steve's Online Portfolio](http://fullstacksteve.com/)
* [Steve's LinkedIn Profile](https://www.linkedin.com/in/sonoa/)