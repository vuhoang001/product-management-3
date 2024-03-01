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