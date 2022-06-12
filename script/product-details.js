const productInfo = async (id) => {
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
  document.body.insertBefore(productSection, footerElem)

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

  $(`#cart-${id}`).click((event) => {
    // console.log(event.target.parentElement)
    const productList = JSON.parse(localStorage.getItem('productList'))
    const cartCountElem = document.getElementById('cart-count')
    // console.log(cartCountElem.innerHTML)
    let cartCount = +cartCountElem.innerHTML + 1
    cartCountElem.innerHTML = cartCount
    localStorage.setItem('cartCount', cartCount)

    console.log(productList[id - 1])
    productList[id - 1].count += 1
    localStorage.setItem('productList', JSON.stringify(productList))
  })
}
const cartCount =
  localStorage.getItem('cartCount') == 'undefined'
    ? localStorage.setItem('cartCount', 0)
    : localStorage.getItem('cartCount')
document.getElementById('cart-count').innerText = cartCount

const searchstr = window.location.search
productInfo(searchstr.substring(2, searchstr.length))
