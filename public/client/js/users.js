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