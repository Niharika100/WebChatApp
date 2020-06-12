 // 
 const socket = io('http://localhost:8000');

 //get DOM elements in a responsive js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");   //this is the class of the message box in home.html

//audio that will play on receiving message
var audio = new Audio('juntos.mp3');

//function which will append event info to the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');

    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);    // there is already a class named right and right is passed as a parameter to position
    messageContainer.append(messageElement);
    if (position == 'left'){
   
        audio.play();
    }  
};

//if the form get submitted, send server the message
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send',message);
    append(`You: ${message}`,'right');
    messageInput.value = "";
});

// ask the new user name,receive the event from the server
const name = prompt("Enter your name to join");

socket.emit('new-user-joined',name);


socket.on('user-joined',name =>{              //name is the parameter
    append(`${name} joined the chat`,'left');   //there is difference between `#` and '#'
});

//if server sends a message,receive it
socket.on('receive',data =>{         
    append(`${data.name}: ${data.message}`,'left');   
});

//if user leave the chat,append the message to the container
socket.on('left',name =>{         
    append(`${name} left the chat`,'left');   
});