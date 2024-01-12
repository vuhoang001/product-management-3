const button = document.querySelector('[filter-button]')
const data = button.querySelectorAll('[button-status]')
data.forEach((item) => {
    item.addEventListener("click", () => {
        const url = new URL(window.location.href)
        const value = item.getAttribute('button-status')
        if (value !== '') {
            url.searchParams.set('status', value)
        } else {
            url.searchParams.delete('status')
        }
        window.location.href = url.href
    })

})


