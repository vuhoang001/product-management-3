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

// Search form
const searchForm = document.getElementById("form-search")
if(searchForm){
    let url = new URL(window.location.href)
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(e.target.elements.keyword.value != ""){
            url.searchParams.set("keyword", e.target.elements.keyword.value)
        } else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End search form 

// Pagination
const paginationButtons = document.querySelectorAll("[button-pagination]")
if(paginationButtons.length > 0){
    let url = new URL(window.location.href)
    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let value = button.getAttribute("button-pagination")
            url.searchParams.set("page", value)
            window.location.href = url.href
        })
    })
}
// End pagination