const stockInput = document.querySelectorAll('[quantity-product]')

if (stockInput.length > 0) {
    stockInput.forEach(input => {
        input.addEventListener("change", (e) => {
            const productID = input.getAttribute("product-id")
            const quantity = e.target.value
            if (quantity > 0)
                window.location.href = `cart/${productID}/${quantity}`
        })
    })
}
