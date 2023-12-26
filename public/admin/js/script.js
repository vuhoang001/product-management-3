// Filter button
const buttonStatus = document.querySelectorAll("[status-data]")
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href)
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href)
            const status = button.getAttribute("status-data")
            if (status != "") {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    }
    )
}
// End filter button