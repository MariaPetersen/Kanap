
//DOM elements for adding product details to page
const itemImage = document.querySelector(".item__img")
const productTitle = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const productColors = document.getElementById("colors")

//Retrieving product ID from URL to identify the right product for the page
const url = window.location.href
const productURL = new URL(url)
const $productId = productURL.searchParams.get('id')

//Retrieving data from API and adding it to DOM
function retrieveProductData() {
    fetch("http://localhost:3000/api/products")
    .then(function(response){
        if(response.ok){
            return response.json()}
        })
    .then(function(productData){
        console.log(productData)
        product = productData.find(function(product){product = product._id === $productId; return product})
        
        itemImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`
        
        productTitle.innerHTML = product.name
        
        productPrice.innerHTML = product.price 
        
        productDescription.innerHTML = product.description 
        
        function insertOptions(){
            for (let i=0 ; i < product.colors.length ; i++) {
                colors.insertAdjacentHTML('beforeend', `<option value='${product.colors[i]}'>${product.colors[i]}</option>`)
            }
        }
        insertOptions()
    })
    .catch(function(error){
      console.log(Error)
    })
}

retrieveProductData()

productColors.addEventListener('change', function(e){
    document.querySelector('option').setAttribute("value", productColors.value)
    e.preventDefault()
})

//DOM elements for add to cart 
const addButton = document.getElementById("addToCart")
const itemQuantity = document.getElementById("quantity")

//Cart object
let ProductInstance = [
    ["", "" , 0]
]

//Add to cart functions
console.log(ProductInstance.id)
addButton.addEventListener("click", 
function addToCart(i){
   ProductInstance.push ([$productId, productColors.value, itemQuantity.value])
    console.log(ProductInstance)
    i.preventDefault()
    }
)
