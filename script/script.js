import {
  createClothAndAccSectionContainer,
  createCardSectionContainer,
  createCardContainer,
  createCardElement,
  createCardDesc,
} from './homePage.js'
let productList = []
$(document).ready(function () {
  const footerElem = document.querySelector('footer')
  async function clothingAndAccessories() {
    const localProductList = window.localStorage.getItem('productList')
    const productListResponse = await fetch(
      'https://5d76bf96515d1a0014085cf9.mockapi.io/product'
    )
    productList = await productListResponse.json()
    if (localProductList) {
      productList = JSON.parse(localProductList)
    }
    for (let product of productList) {
      product.count == undefined ? (product.count = 0) : product.count
      // console.log(product.count)
    }
    window.localStorage.setItem('productList', JSON.stringify(productList))
    const [clothSectionContainer, accSectionContainer] =
      createClothAndAccSectionContainer('Clothing', 'Accessories')
    document.body.insertBefore(clothSectionContainer, footerElem)
    document.body.insertBefore(accSectionContainer, footerElem)
    for (let { id } of productList) {
      const cardElem = document.getElementById(id)
      cardElem.addEventListener('click', async (event) => {
        cardElem.href = `./productDetails.html?=${id}`
      })
    }
  }

  clothingAndAccessories()
})
const cartCount =
  localStorage.getItem('cartCount') == 'undefined'
    ? localStorage.setItem('cartCount', 0)
    : localStorage.getItem('cartCount')
document.getElementById('cart-count').innerText = cartCount

export { productList }
