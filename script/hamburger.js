const createSubCategories = () => {
  const categoriesList = document.createElement('ul')
  categoriesList.className = 'nav-sub'
  const clothingItem = createSubCategories('clothing')
  const accessoriesItem = createSubCategories('accessories')
  const checkoutItem = createSubCategories('Cart')
  categoriesList.appendChild(clothingItem, accessoriesItem, checkoutItem)
  return categoriesList
}
const createSubCategoryItem = (categoryName) => {
  const categoriesItem = document.createElement('li')
  categoriesItem.className = 'list-item'
  categoriesItem.id = categoryName + '-section'
  const categoryLink = document.createElement('a')
  // categoryLink.id = categoryName + '-section'
  categoryLink.href = './index.html#' + categoryName + '-section'
  categoriesItem.appendChild(categoryLink)
  return categoriesItem
}
const hamburger = document.querySelector('.ham')
console.log(hamburger)
const navsub = document.querySelector('.nav-sub')
const navBar = document.getElementById('top-bar')
// const categoriesList = createSubCategories()
// console.log(navBar)
// const /
hamburger.addEventListener('click', (e) => {
  hamburger.classList.toggle('change')
  console.log(e.target)
  navsub.classList.toggle('nav-display')
  //   navBar.appendChild(categoriesList)
  //   document.body.append(navBar)
  //   document.body.append(categoriesList)
  // <ul class="nav-sub">
  //  <li class="list-item"><a href="#" class="nav-link">Clothing</a></li>
  //  <li class="list-item"><a href="#" class="nav-link">Accessories</a></li>
  //  <li class="list-item"><a href="#" class="nav-link">Cart</a></li>
  // </ul>
  navsub.classList.toggle('nav-change')
})
