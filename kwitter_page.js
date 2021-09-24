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

    room_name=localStorage.getItem("room_name");
    user_name=localStorage.getItem("user_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;
//Start code
            console.log(firebase_message_id);
            console.log(message_data);

            name=message_data['name'];
            like=message_data['like'];
            message=message_data['message'];

            name_tag="<h4> "+name+"<img class='user_tick' src='tick.png'> </h4>";
            message_tag="<h4 class='message_h4'> "+message+" </h4>";
            button_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
            span_tag="<span class='glyphicon glyphicon-thumbs-up'> Like:"+like+" </span></button><hr>";

            row=name_tag+message_tag+button_tag+span_tag;
            document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}

function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            like:0,
            message:msg,
            name:user_name
      });

      document.getElementById("msg").value="";
}

function update_like(message_id){
      console.log("Button Id That Has Been Clicked="+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}