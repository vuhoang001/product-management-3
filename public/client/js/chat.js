import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// CLIENT_SEND_MESSAGE 
const formSendData = document.querySelector('.chat .inner-form')
if (formSendData) {
    formSendData.addEventListener('submit', (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value
        const images = upload.cachedFileArray || [];
        if (content || images.length > 0) {
            socket.emit('client_send_message', {
                content: content,
                images: images
            })
            e.target.elements.content.value = ''
            upload.resetPreviewPanel(); // clear all selected images (file upload with preview)
        }
    })
}
// END_CLIENT_SEND_MESSAGE


// server_return_message
socket.on("server_return_message", (data) => {
    let htmlContent = ''
    const body = document.querySelector('.chat .inner-body')
    const boxTyping = document.querySelector('.inner-list-typing')
    const div = document.createElement('div')
    div.classList.add("inner-incoming")
    if (data.content) {
        htmlContent = `<div class='inner-content'>${data.content}</div><br>`
    }

    if (data.images) {
        htmlImages += `<div class='inner-images'>`
        for (const image of data.images) {
            htmlImages += `
                <img src="${data.image}"
            `
        }
        htmlImages += `</div>`
    }
    div.innerHTML = `
        <div class='inner-name'>${data.fullName}</div>
        ${htmlContent}
        ${htmlImages}
    `

    body.insertBefore(div, boxTyping)
    body.scrollTop = body.scrollHeight
})
// server_return_message

// scoll_chat_to_bottom 
const chatForm = document.querySelector('.chat .inner-body')
if (chatForm) {
    chatForm.scrollTop = chatForm.scrollHeight
}
// scoll_chat_to_bottom

// emoji 

const buttonIcon = document.querySelector('.button-icon')

if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)

    document.querySelector('.button-icon').onclick = () => {
        tooltip.classList.toggle('shown')
    }
}
document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
        console.log(event.detail.unicode)
        const emoji = event.detail.unicode

        const bodyInput = document.querySelector('.inner-form')
        const innerInput = bodyInput.querySelector('input')
        innerInput.value = innerInput.value + emoji
    });
// emoji 

// typing 
const inputForm = document.querySelector('.inner-form')
const innerInput = inputForm.querySelector('input')
var timeOut
innerInput.addEventListener('keyup', () => {
    socket.emit('send_action_typing_to_server', 'pressing')
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
        socket.emit('send_action_typing_to_server', 'hidden')
    }, 2000)


})

const innerListTyping = document.querySelector('.inner-list-typing')
if (innerListTyping) {
    socket.on('send_action_typing_to_client', (msg) => {
        const type = msg.content;
        if (type == 'pressing') {
            const exist = innerListTyping.querySelector(`[user-id="${msg.userID}"]`)
            if (!exist) {
                const boxTyping = document.createElement('div')
                boxTyping.classList.add('box-typing')
                boxTyping.setAttribute('user-id', msg.userID)
                boxTyping.innerHTML = `
                    <div class="inner-name">${msg.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `
                innerListTyping.appendChild(boxTyping)
                chatForm.scrollTop = chatForm.scrollHeight
            }
        } else {
            const exist = innerListTyping.querySelector(`[user-id="${msg.userID}"]`)
            innerListTyping.removeChild(exist)
        }
    })

}
// end typing 


// uploadPreview 
const upload = new FileUploadWithPreview.FileUploadWithPreview('my-unique-id', {
    multiple: true,
    maxFileCount: 6
});
// end uploadPreview