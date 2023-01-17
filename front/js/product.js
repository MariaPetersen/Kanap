
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

//Change product color value when option selected
productColors.addEventListener('change', function(e){
    document.querySelector('option').setAttribute("value", productColors.value)
    e.preventDefault()
})

//DOM elements for add to cart 
const addButton = document.getElementById("addToCart")
const itemQuantity = document.getElementById("quantity")

//Cart object

    function Item (id, color, quantity) {
        this.id = id;
        this.color = color;
        this.quantity = quantity
    }

    let cart = []

   
    function addItemsToCart() {

        if (cart === null){
        cart.push(new Item($productId, productColors.value, itemQuantity.value))
        localStorage.setItem("product", JSON.stringify(cart))
        return console.log(localStorage)}
        else
        {
        alreadyInCart = localStorage.getItem("product")
        alreadyInCart = JSON.parse(alreadyInCart)
        console.log(alreadyInCart)
 
        function findId(product) {
            product.id === $productId
            return product.color === productColors.value
        } //fonctionne 

        let redundantProduct = alreadyInCart.find(findId)
        console.log(redundantProduct) //fonctionne

        let i = alreadyInCart.findIndex(findId)
        console.log(i)}

            if (redundantProduct) { //condition fonctionne
                    let quantityAIng = parseInt(redundantProduct.quantity)
                    let quantityBIng = parseInt(itemQuantity.value)
                    alreadyInCart[i] = {id: $productId, color: productColors.value, quantity: quantityAIng + quantityBIng}
                    cart = alreadyInCart
                    localStorage.clear() 
                    localStorage.setItem("product", JSON.stringify(cart))
                    return console.log(localStorage)
                }
        
         else {
        cart.push(new Item($productId, productColors.value, itemQuantity.value))
        localStorage.setItem("product", JSON.stringify(cart))
        return console.log(localStorage)
    }
    }

        // function saveCart(){let stringified = JSON.stringify(cart);
        //         return localStorage.setItem(prod, stringified)}

        // function getCart (prod) {
        //         let productsInCart = JSON.parse(localStorage.getItem(prod))
        //     return cart = productsInCart}


//Add to cart functions


addButton.addEventListener("click", addItemsToCart)

