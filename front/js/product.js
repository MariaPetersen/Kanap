
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
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        .then(function (productData) {
            product = productData.find(function (product) { product = product._id === $productId; return product })

            itemImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`

            productTitle.innerHTML = product.name

            productPrice.innerHTML = product.price

            productDescription.innerHTML = product.description

            function insertOptions() {
                for (let i = 0; i < product.colors.length; i++) {
                    colors.insertAdjacentHTML('beforeend', `<option value='${product.colors[i]}'>${product.colors[i]}</option>`)
                }
            }
            insertOptions()
        })
        .catch(function (error) {
            console.log(Error)
        })
}

retrieveProductData()

//Change product color value when option selected
productColors.addEventListener('change', function (e) {
    document.querySelector('option').setAttribute("value", productColors.value)
    e.preventDefault()
})

//DOM elements for add to cart 
const addButton = document.getElementById("addToCart")
const itemQuantity = document.getElementById("quantity")

//Cart object

function Item(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity
}

let cart = []
let alreadyInCart = []

function addNewProduct(array) {
    array.push(new Item($productId, productColors.value, itemQuantity.value))
    localStorage.setItem("product", JSON.stringify(array))
    console.log(localStorage)
}

function addItemsToCart() {
    
    alreadyInCart = localStorage.getItem("product")
    alreadyInCart = JSON.parse(alreadyInCart)

    if (alreadyInCart) {

        function findId(product) {
            product.id === $productId
            return product.color === productColors.value
        } //fonctionne 

        let redundantProduct = alreadyInCart.find(findId)
        console.log(redundantProduct)

        if (redundantProduct) {
            let i = alreadyInCart.findIndex(findId)
            console.log(i)
            let quantityAIng = parseInt(redundantProduct.quantity)
            let quantityBIng = parseInt(itemQuantity.value)
            alreadyInCart[i] = { id: $productId, color: productColors.value, quantity: quantityAIng + quantityBIng }
            let cart = alreadyInCart
            localStorage.setItem("product", JSON.stringify(cart))
            console.log(localStorage)
        }

        else {
            let cart = alreadyInCart
            addNewProduct(cart)
            // cart.push(new Item($productId, productColors.value, itemQuantity.value))
            // localStorage.setItem("product", JSON.stringify(cart))
            // console.log(localStorage)
        }

    }
    else {
        addNewProduct(cart)
        // cart.push(new Item($productId, productColors.value, itemQuantity.value))
        // localStorage.setItem("product", JSON.stringify(cart))
        // console.log(localStorage)
    }
}


//Add to cart functions


addButton.addEventListener("click", addItemsToCart)

