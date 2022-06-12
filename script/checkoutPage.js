const cartCount =
  localStorage.getItem('cartCount') == 'undefined'
    ? localStorage.setItem('cartCount', 0)
    : localStorage.getItem('cartCount')
document.getElementById('cart-count').innerText = cartCount
{
  /* <section id="main-section">
            <h1 id="main-heading">Checkout</h1>

            <div id="content-wrapper">
                <div id="card-list">
                    <h3 class="section-heading">Total Items: 
                    <span id="item-count">10</span></h3>
                <div class="checkout-card">
                <div>
                <img class="checkout-product-img" 
                src="https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg"></div>
                <div><h4>Men Navy Blue Solid Sweatshirt</h4>
                <p>x1</p>
                <p><span>Amount: Rs </span>
                <span>2599</span></p>
                   </div>
                    </div>
                </div>

                <div>
                    <h3 class="section-heading">Total Amount</h3>
                    <p>Amount: Rs<span id="total-amount">120772</span></p>
                    <button id="btn-place-order">Place Order</button>
                </div>
            </div>
        </section> */
}
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
  //checkoutCard div
  //   productList.forEach((obj) => console.log(obj))

  //   const checkoutCard = createCheckoutCard()
  //totalAmount Section
  const totalAmountSection = createTotalAmountSection()
  //   cardList.append(totalItemsWrapper, checkoutCard)
  cardList.append(totalItemsWrapper)
  contentWrapper.append(cardList, totalAmountSection)
  sectionElem.append(checkoutTitle, contentWrapper)

  return sectionElem
}

function createCheckoutCard(product) {
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
  //   let checkoutItemAmountHeader = `{<span>Amount: Rs </span>}`
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
// console.log(productList)
// console.log(totalAmountElem)
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
  //   let orderedDetails = {
  //     totalAmount: totalAmountValue,
  //     products: orderedItems,
  //   }
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
