const formSearch = document.querySelector('[search-form]')
if (formSearch) {
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        if (e.target.elements.keyword.value != "") {
            url.searchParams.set("keyword", e.target.elements.keyword.value)
        } else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}