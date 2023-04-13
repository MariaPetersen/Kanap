//VARIABLES 

//DOM elements for adding product details to page
const itemImage = document.querySelector(".item__img")
const productTitle = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const productColors = document.getElementById("colors")
console.log(productColors.value)

//DOM elements for add to cart 
const addButton = document.getElementById("addToCart")
const itemQuantity = document.getElementById("quantity")

//Define cart object
function Item(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity
}

//Cart arrays
let cart = []
let alreadyInCart = []

//FUNCTIONS

//Functions for creating elements of product
const createProductImg = (element, product) => {
    const productImg = element.appendChild(document.createElement('img'))
    productImg.setAttribute('src', `${product.imageUrl}`)
    productImg.setAttribute('alt', `${product.altTxt}`)
}

const insertItemData = (element, data) => {
    element.textContent = data
}

//Function for retrieving product ID from URL to identify the right product for the page
const getProductId = () => {
    const url = window.location.href
    const productURL = new URL(url)
    const productId = productURL.searchParams.get('id')
    return productId
}

//Functions for insterting color options and changing them
function insertOptions(product) {
    for (let i = 0; i < product.colors.length; i++) {
        colors.insertAdjacentHTML(
            'beforeend', 
            `<option value='${product.colors[i]}'>${product.colors[i]}</option>`
        )
    }
}
const changeColor = (productColors) => {
    productColors.addEventListener('change', function (e) {
        document.querySelector('option').setAttribute("value", productColors.value)
        e.preventDefault()
    })
}

//Retrieving data from API and adding it to DOM
function retrieveProductData() {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function (product) {
            createProductImg(itemImage, product)
            insertItemData(productTitle, product.name)
            insertItemData(productPrice, product.price)
            insertItemData(productDescription, product.description)
            insertOptions(product)
        })
        .catch(function (error) {
            console.log(Error)
        })
}

//Function to add new product
function addNewProduct(array) {
    array.push(new Item(productId, productColors.value, itemQuantity.value))
    addToLocalStorage(array)
}

//Function to add to local storage 
const addToLocalStorage = (array) => {
    localStorage.setItem("product", JSON.stringify(array))
}

//Retrieve local storage 
const retrieveLocalStorage = () => {
    alreadyInCart = localStorage.getItem("product")
    alreadyInCart = JSON.parse(alreadyInCart)
}

//Function to check if product already exists 
function findId(product) {
            product.id === productId
            return product.color === productColors.value
        } 

//Function to find index
const findIndex = (array) => {
    let i = array.findIndex(findId)
    return i
}

//Function to add new quantity to cart
const addQuantityProduct = (array, product, itemQuantity) => {
    let i = findIndex(array)
    let quantityAIng = parseInt(product.quantity)
    let quantityBIng = parseInt(itemQuantity.value)
    array[i] = { id: productId, color: productColors.value, quantity: quantityAIng + quantityBIng}
}

//Function to add items to cart
function addItemsToCart() {
    retrieveLocalStorage()
    console.log(productColors.value != "")
    if (itemQuantity.value >= 1 && itemQuantity.value <= 100 && productColors.value != "")  {
        if (alreadyInCart) {
            
            let redundantProduct = alreadyInCart.find(findId)

            if (redundantProduct) {
                addQuantityProduct(alreadyInCart, redundantProduct, itemQuantity)
                addToLocalStorage(alreadyInCart)
                alert('Le produit est ajouté au panier !')
            }

            else {
                addNewProduct(alreadyInCart)
                alert('Le produit est ajouté au panier !')
            }
        }
        else {
            addNewProduct(cart)
            alert('Le produit est ajouté au panier !')
        }
    } else {
        alert("Veuillez sélectionner des données valides");
    }
}

const productId = getProductId()
retrieveProductData()
changeColor(productColors)
addButton.addEventListener("click", addItemsToCart)

