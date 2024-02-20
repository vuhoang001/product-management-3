// CLIENT_SEND_MESSAGE 
const formSendData = document.querySelector('.chat .inner-form')
formSendData.addEventListener('submit', (e) => {
    e.preventDefault()
    const content = e.target.elements.content.value
    if (content) {
        socket.emit('client_send_message', content)
        e.target.elements.content.value = ''
    }
})
// END_CLIENT_SEND_MESSAGE


// server_return_message
socket.on("server_return_message", (data) => {
    const body = document.querySelector('.chat .inner-body')

    const div = document.createElement('div')
    div.classList.add("inner-incoming")
    div.innerHTML = `
        <div class='inner-name'>${data.fullName}</div>
        <div class='inner-content'>${data.content}</div>
    `

    body.appendChild(div)
    body.scrollTop = body.scrollHeight
})
// server_return_message

// scoll_chat_to_bottom 
const chatForm = document.querySelector('.chat .inner-body')
if (chatForm) {
    chatForm.scrollTop = chatForm.scrollHeight
}
// scoll_chat_to_bottom