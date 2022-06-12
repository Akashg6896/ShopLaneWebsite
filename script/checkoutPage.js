const cartCount =
  localStorage.getItem('cartCount') == 'undefined'
    ? localStorage.setItem('cartCount', 0)
    : localStorage.getItem('cartCount')
document.getElementById('cart-count').innerText = cartCount

// let productList = []
function createCheckoutSection() {
  const sectionElem = document.createElement('section')
  sectionElem.id = 'main-section'
  const checkoutTitle = document.createElement('h1')
  checkoutTitle.id = 'main-heading'
  checkoutTitle.innerHTML = 'Checkout'
  const contentWrapper = document.createElement('div')
  contentWrapper.id = 'content-wrapper'
  const cardList = document.createElement('div')
  cardList.id = 'card-list'
  const totalItemsWrapper = document.createElement('h3')
  totalItemsWrapper.className = 'section-heading'
  const itemCount = document.createElement('span')
  itemCount.id = 'item-count'
  itemCount.innerText = ' 0'
  totalItemsWrapper.innerHTML = 'Total Items:' // + itemCount
  totalItemsWrapper.append(itemCount)

  //totalAmount Section
  const totalAmountSection = createTotalAmountSection()
  cardList.append(totalItemsWrapper)
  contentWrapper.append(cardList, totalAmountSection)
  sectionElem.append(checkoutTitle, contentWrapper)

  return sectionElem
}

function createCheckoutCard(product) {
  const checkoutCard = document.createElement('div')
  checkoutCard.className = 'checkout-card'
  const checkoutItemImgWrapper = document.createElement('div')
  const checkoutItemImg = document.createElement('img')
  checkoutItemImg.src = product.preview
  checkoutItemImg.className = 'checkout-product-img'
  const checkoutItemDesc = document.createElement('div')
  const checkoutItemTitle = document.createElement('h4')
  checkoutItemTitle.innerHTML = product.name
  const checkoutItemCount = document.createElement('p')
  checkoutItemCount.innerHTML = `x${product.count}`
  const checkoutItemPrice = document.createElement('p')
  let checkoutItemAmountHeader = document.createElement('span')
  checkoutItemAmountHeader.innerHTML = 'Amount: Rs '
  const checkoutItemAmount = document.createElement('span')
  checkoutItemAmount.innerHTML = `${product.count * product.price}`
  checkoutItemAmountHeader.append(checkoutItemAmount)
  console.log(checkoutItemAmountHeader)
  checkoutItemPrice.append(checkoutItemAmountHeader)
  console.log(checkoutItemPrice.innerHTML)

  checkoutItemDesc.append(
    checkoutItemTitle,
    checkoutItemCount,
    checkoutItemPrice
  )
  checkoutItemImgWrapper.append(checkoutItemImg)
  checkoutCard.append(checkoutItemImgWrapper, checkoutItemDesc)

  return checkoutCard
}
function createTotalAmountSection() {
  //totalAmount Section
  const totalAmountSection = document.createElement('div')
  const totalAmountHeading = document.createElement('h3')
  totalAmountHeading.className = 'section-heading'
  totalAmountHeading.innerHTML = 'Total Amount'
  const amountElem = document.createElement('p')
  const totalAmount = document.createElement('span')
  totalAmount.id = 'total-amount'
  totalAmount.innerHTML = '0'
  amountElem.innerHTML = 'Amount: Rs'
  amountElem.append(totalAmount)
  //place Order button
  const orderBtn = document.createElement('button')
  orderBtn.id = 'btn-place-order'
  orderBtn.innerHTML = 'Place Order'
  totalAmountSection.append(totalAmountHeading, amountElem, orderBtn)
  return totalAmountSection
}
let productList = []
if (localStorage.getItem('productList')) {
  productList = JSON.parse(localStorage.getItem('productList'))
}

const footerElem = document.querySelector('footer')
console.log(footerElem)
let checkoutSection = createCheckoutSection()

document.body.insertBefore(checkoutSection, footerElem)
const hamburger = document.querySelector('.ham')
const navsub = document.querySelector('.nav-sub')
const navBar = document.getElementsByTagName('nav')
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('change')
  const categoriesList = createSubCategories()
  categoriesList.classList.toggle('nav-change')
})
let itemCountValue = 0
let totalAmountValue = 0
let itemCountElem = document.querySelector('#item-count')
let totalAmountElem = document.querySelector('#total-amount')
let cardList = document.querySelector('#card-list')
// cardList.id = 'card-list'
for (let product of Object.values(productList)) {
  if (product.count) {
    itemCountValue += 1
    totalAmountValue += product.price * product.count
    const checkoutCard = createCheckoutCard(product)
    cardList.append(checkoutCard)
  }
}
itemCountElem.innerHTML = ` ${itemCountValue}`
totalAmountElem.innerHTML = ` ${totalAmountValue}`

$('#btn-place-order').click((event) => {
  console.log(event)
  let orderedItems = []
  for (let product of Object.values(productList)) {
    if (product.count > 0) {
      orderedItems.push(product)
    }
  }

  let cartCount = window.localStorage.getItem('cartCount')
  if (cartCount > 0) {
    fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/order', {
      totalAmount: totalAmountValue,
      items: orderedItems,
    }).then((res) => {
      console.log(res)
      localStorage.setItem('productList', [])
      localStorage.setItem('cartCount', 0)
      window.location.href = './orderConfirmation.html'
    })
  }
})
