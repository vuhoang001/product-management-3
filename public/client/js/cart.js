const stockInput = document.querySelectorAll('[quantity-product]')

if (stockInput.length > 0) {
    stockInput.forEach(input => {
        input.addEventListener("change", (e) => {
            const url = new URL(window.location.href)
            const productID = input.getAttribute("product-id")
            const quantity = e.target.value
            window.location.href = `cart/${productID}/${quantity}`
        })
    })
}
