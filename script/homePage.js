// let productList = []
import { productList } from './script.js'
// let productList = window.localStorage.getItem('productList')
$(document).ready(function () {
  $('.img-carousel').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    speed: 600,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  })
  //   clothingAndAccessories()

  // productInfo()
  //onClick event handler
})
function createClothAndAccSectionContainer(clothCardName, accCardName) {
  const clothsectionContainer = createCardSectionContainer(clothCardName)

  const accessoriesSectionContainer = createCardSectionContainer(accCardName)
  //   console.log(clothsectionContainer)
  let [clothCardContainer, accessoriesCardContainer] = createCardContainer()
  //   console.log(clothCardContainer)
  clothsectionContainer.append(clothCardContainer)
  accessoriesSectionContainer.append(accessoriesCardContainer)
  console.log(clothsectionContainer, accessoriesSectionContainer)
  return [clothsectionContainer, accessoriesSectionContainer]
}
function createCardSectionContainer(cardName) {
  const sectionContainer = document.createElement('div')
  sectionContainer.className = cardName.toLowerCase() + '-section-container'
  sectionContainer.id = cardName.toLowerCase() + '-section'
  const sectionTitle = document.createElement('h2')
  sectionTitle.innerHTML = cardName + ' for Men and Women'
  sectionContainer.appendChild(sectionTitle)
  return sectionContainer
}
function createCardContainer() {
  // const clothingCard, accessoriesCard
  const clothCardContainer = document.createElement('div')
  clothCardContainer.className = 'card-container'
  const accessoriesCardContainer = document.createElement('div')
  accessoriesCardContainer.className = 'card-container'
  for (let id = 0; id < productList.length; id++) {
    if (productList[id].isAccessory == false) {
      let cardElement = createCardElement(productList[id], id + 1)
      clothCardContainer.appendChild(cardElement)
    } else {
      let cardElement = createCardElement(productList[id], id + 1)
      accessoriesCardContainer.appendChild(cardElement)
    }
  }
  return [clothCardContainer, accessoriesCardContainer]
}
function createCardElement(item, index) {
  const cardElement = document.createElement('a')
  cardElement.id = index
  cardElement.className = 'card'
  const cardImage = document.createElement('img')
  cardImage.src = item.preview
  cardImage.alt = item.name
  const cardDesc = createCardDesc(item, index)
  cardElement.appendChild(cardImage)
  cardElement.appendChild(cardDesc)
  return cardElement
}

function createCardDesc(item, index) {
  const cardDesc = document.createElement('div')
  cardDesc.id = 'desc-id-' + index
  cardDesc.className = 'desc'
  const descName = document.createElement('h3')
  descName.id = 'desc-name-' + index
  const descBrand = document.createElement('h4')
  descBrand.id = 'desc-brand-' + index
  const descPrice = document.createElement('h5')
  descPrice.id = 'desc-price-' + index
  descName.innerHTML = item.name
  descBrand.innerHTML = item.brand
  descPrice.innerHTML = 'Rs ' + item.price
  cardDesc.appendChild(descName)
  cardDesc.appendChild(descBrand)
  cardDesc.appendChild(descPrice)
  return cardDesc
}

const cartCount =
  localStorage.getItem('cartCount') == 'undefined'
    ? localStorage.setItem('cartCount', 0)
    : localStorage.getItem('cartCount')
document.getElementById('cart-count').innerText = cartCount

export {
  createClothAndAccSectionContainer,
  createCardSectionContainer,
  createCardContainer,
  createCardElement,
  createCardDesc,
}
