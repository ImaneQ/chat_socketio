const sendButton = document.querySelector('#send_button');
const messageInput = document.querySelector('#message_input');
const messagesContainer = document.querySelector('#messages');
const usernameInput = document.querySelector('#username');
const msgForm = document.querySelector('#msgForm');

let socket = io();


socket.on('message', data => {

    console.log(data);
    appendMessages(data)
})


socket.on('last-messages', data => {

    console.log(data);
    if (data.length) {
        data.forEach(Object => {

            appendMessages(Object.msg)
        });
    }
})



msgForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chat message', msgForm.msg.value)
    msgForm.msg.value = '';


});


function appendMessages(message) {
    const html = `<div>${message}</div>`;
    messagesContainer.innerHTML += html;
}



//# sourceMappingURL=script.js.map