const firebaseConfig = {
      apiKey: "AIzaSyBW-oThBjyGnKfp6a_d3vWc3XUqac0H_JE",
      authDomain: "kwitter-2501.firebaseapp.com",
      databaseURL: "https://kwitter-2501-default-rtdb.firebaseio.com",
      projectId: "kwitter-2501",
      storageBucket: "kwitter-2501.appspot.com",
      messagingSenderId: "660957298593",
      appId: "1:660957298593:web:03dfebd502219256a155e0"
    };
  
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome "+user_name+"!"; 

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name -" +Room_names );
      row="<div class='room_name' id="+Room_names+" onclick='go_room(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function log_out(){
      window.location="index.html";
      localStorage.removeItem("user_name");
}

function add_room(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location="kwitter_page.html";
}

function go_room(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location="kwitter_page.html";
}