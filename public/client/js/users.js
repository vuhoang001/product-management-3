// Chức năng gửi yêu cầu 
const listAddFriend = document.querySelectorAll('[btn-add-friend]')

if (listAddFriend) {
    listAddFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest('.box-user').classList.add('add')
            const userID = btn.getAttribute('btn-add-friend')
            socket.emit("client_add_friend", userID)
        })
    });
}
// Kết thúc chức năng gửi yêu cầu

// Chức năng hủy yêu cầu kết bạn
const listCancelFriend = document.querySelectorAll("[btn-cancel-friend]")
if (listCancelFriend) {
    listCancelFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest('.box-user').classList.remove('add')
            const userID = button.getAttribute('btn-cancel-friend')
            socket.emit('client_cancel_friend', userID)
        })
    })
}
// Kết thúc chức năng hủy yêu cầu kết bạn 

// Chức năng chấp nhận yêu cầu kết bạn 
const listAcceptFriend = document.querySelectorAll('[btn-accept-friend]')
if (listAcceptFriend) {
    listAcceptFriend.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.box-user').classList.remove('add')
            const userID = button.getAttribute('btn-accept-friend')
            socket.emit('client_accept_friend', userID)
        })
    })
}
// Kết thúc chức năng chấp nhận yêu cầu kết bạn 

//Chức năng hủy yêu cầu kết bạn 
const listDeclinetFriend = document.querySelectorAll('[btn-decline-friend]')
if (listDeclinetFriend) {
    listDeclinetFriend.forEach(button => {
        button.addEventListener('click', () => {
            const userID = button.getAttribute('btn-decline-friend')
            button.closest('.box-user').classList.remove('add')
            socket.emit('client_decline_friend', userID)
        })
    })
}
// Kết thúc chức năng hủy yêu cầu kết bạn 


// Chức năng hủy kết bạn 
const unfriendList = document.querySelectorAll("[btn-unfriend-friend]")
if (unfriendList) {
    unfriendList.forEach(button => {
        button.addEventListener("click", () => {
            const userID = button.getAttribute('btn-unfriend-friend')
            button.closest('.box-user').classList.add('add')
            socket.emit('client_unfriend_friend', userID)
        })
    })
}
// Kết thúc chức năng hủy kết bạn 