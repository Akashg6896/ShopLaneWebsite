// // window.onload = function () {
// var productData = {
//   id: '1',
//   name: 'Men Navy Blue Solid Sweatshirt',
//   preview:
//     'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg',
//   photos: [
//     'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg',
//     'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/efc3d5b9-1bb3-4427-af53-7acae7af98951541402833591-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-2.jpg',
//     'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/c7e58861-3431-4189-9903-9880f5eebd181541402833566-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-3.jpg',
//     'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/66490b64-32de-44b4-a6e4-fe36f1c040051541402833548-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-4.jpg',
//     'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/957be784-7c5d-4e90-ab9f-0928015b22891541402833645-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-5.jpg',
//   ],
//   description:
//     'Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem',
//   size: [1, 1, 0, 1, 0],
//   isAccessory: false,
//   brand: 'United Colors of Benetton',
//   price: 2599,
// }

const productInfo = async (id) => {
  // window.location.href = `./productDetails.html?=${id}`
  const footerElem = document.querySelector('footer')
  const productData = await fetch(
    `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`
  ).then((res) => res.json())
  console.log(`${productData.id}`)
  //Create Products Details Section
  const productSection = document.createElement('section')
  productSection.className = 'product-section-div'

  //Create Products Image Section
  const productImageSection = document.createElement('div')
  productImageSection.className = 'product-img-div'
  //Create Products Desc Section
  const productDescSection = document.createElement('div')
  productDescSection.className = 'product-desc-div'

  //Create Products Image element
  const productImage = document.createElement('img')
  productImage.src = productData.preview
  productImage.id = 'img-preview'
  productImageSection.prepend(productImage)
  productSection.prepend(productImageSection)
  // console.log('document child')
  // document.body.appendChild(productSection)

  //Product Image Description
  //Product Name
  const productName = document.createElement('h1')
  productName.innerHTML = productData.name

  //Product Brand
  const productBrand = document.createElement('h3')
  productBrand.innerHTML = productData.brand

  //Product Price
  const productPriceSection = document.createElement('h3')
  const productPrice = document.createElement('span')
  productPrice.innerHTML = productData.price
  productPriceSection.innerHTML = 'Price: Rs '
  productPriceSection.append(productPrice)

  //Product Description
  const productDesc = document.createElement('h3')
  const productDescInfo = document.createElement('p')
  productDesc.textContent = 'Description'
  productDescInfo.textContent = productData.description

  //create Product Image photos Element
  const productImagePhotosSection = document.createElement('div')
  productImagePhotosSection.className = 'product-img-preview'
  const photoDesc = document.createElement('h3')
  photoDesc.textContent = 'Product Preview'
  const productImagePhotos = document.createElement('div')
  productImagePhotos.className = 'preview-img-section'
  let firstImage = true
  let index = 0
  for (let photo of productData.photos) {
    const productPreviewImage = document.createElement('img')
    productPreviewImage.src = photo
    productPreviewImage.id = 'img-' + index

    if (firstImage) {
      productPreviewImage.className = 'active'
      firstImage = false
    }
    productImagePhotos.append(productPreviewImage)
    index++
  }
  productImagePhotosSection.append(photoDesc, productImagePhotos)

  //create Button
  const AddToCartButton = document.createElement('button')
  AddToCartButton.innerText = 'Add to cart'
  AddToCartButton.id = 'cart-' + id
  productDescSection.append(
    productName,
    productBrand,
    productPriceSection,
    productDesc,
    productDescInfo,
    productImagePhotosSection,
    AddToCartButton
  )
  productSection.append(productDescSection)
  // console.log('before append productSection')
  document.body.insertBefore(productSection, footerElem)
  // console.log(document.body)

  //onClick event handler
  for (let productImagePhoto of productImagePhotos.childNodes) {
    $(productImagePhoto).click((event) => {
      let productPreviewImage = document.getElementById('img-preview')
      let productActivePhoto = Array.from(
        document.getElementsByClassName('active')
      ).pop()
      // console.log($('#img-preview').dataset)
      productPreviewImage.src = event.target.src
      productActivePhoto.className = ''
      event.target.className = 'active'
    })
  }
  // const addToCartBtn = document.getElementById(`cart-${id}`)
  // addToCartBtn.addEventListener('')
  $(`#cart-${id}`).click((event) => {
    // console.log(event.target.parentElement)
    const productList = JSON.parse(localStorage.getItem('productList'))
    const cartCountElem = document.getElementById('cart-count')
    // console.log(cartCountElem.innerHTML)
    let cartCount = +cartCountElem.innerHTML + 1
    cartCountElem.innerHTML = cartCount
    localStorage.setItem('cartCount', cartCount)
    // productList[id].count ? 1 : productList[id].count++
    // console.log(productList[id])
    // if (productList[id].count) productList[id].count++
    // else productList[id].count = 1
    console.log(productList[id - 1])
    productList[id - 1].count += 1
    localStorage.setItem('productList', JSON.stringify(productList))
    // console.log(productList[id].price)
    // console.log(productList[id].count)
  })
}
const cartCount =
  localStorage.getItem('cartCount') == 'undefined'
    ? localStorage.setItem('cartCount', 0)
    : localStorage.getItem('cartCount')
document.getElementById('cart-count').innerText = cartCount

const searchstr = window.location.search
productInfo(searchstr.substring(2, searchstr.length))
// export { productInfo }
// }
// let script = document.createElement('script')
// script.onload = () => {
//   productInfo()
// }
// document.body.append(script)
