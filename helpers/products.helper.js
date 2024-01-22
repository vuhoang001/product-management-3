module.exports.price = (productsFeatured1) => {
    const productsFeatured = productsFeatured1.map((item) => {
        item.price = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(2)
        return item;
    })

    return productsFeatured
}