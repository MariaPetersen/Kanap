
//DOM elements
const cartItems = document.getElementById("cart__items")
const inputQuantity = document.getElementsByName('itemQuantity')

let cart = localStorage.getItem("product")
                cart = JSON.parse(cart)

//Functions for change quantity 

function findProductColor(element, i){
    let productArticle = element[i].closest("article.cart_item")
    let productColor = productArticle.getAttribute("data-color")
    return productColor
}
function findProductId(element, i){
    let productArticle = element[i].closest("article.cart_item")
    let productId = productArticle.getAttribute("data-id")
    return productId
}

const findInput = (index, element) => {
    let input = element[index].closest('input')
    return input
}

const setQuantity = (input, index, element) => {
    input.setAttribute(
        "value",
        element[index].value
    )
    let thisParagraph = input.previousElementSibling
    thisParagraph.textContent = `Qté : ${element[index].value}`
}

function findItemInCart(id, color, array){

    for (let i=0; i < cart.length; i++){
        if(id === array[i].id && color === array[i].color){
            return array[i]
        }
    }
}

const updateStorageQuantity = (item, array, element, index) => {
    item.quantity = element[index].value
    localStorage.setItem("product", JSON.stringify(array))
    console.log(localStorage)
}

function changeQuantity(){    
    for (let i=0; i < inputQuantity.length; i++){
    
        inputQuantity[i].addEventListener(
            "change",
            (event) =>{
                event.preventDefault()
                let thisInput = findInput(i, inputQuantity)
                setQuantity(thisInput, i, inputQuantity)

                let productId = findProductId(inputQuantity, i)
                let productColor = findProductColor(inputQuantity, i)
                let cartItem = findItemInCart(productId, productColor, cart)

                updateStorageQuantity(cartItem, cart, inputQuantity, i)
            }
        )
    }
}

//Function to find product in API 
function searchProduct(proId, productData){
    for (let i=0; i < productData.length; i++){
        if(productData[i]._id === proId)
        return productData[i]
    }
}

//Functions to add items to cart 
function addImage(parent, product){
    const imageItem = parent.appendChild(document.createElement('div'))
    imageItem.classList.add("cart__item__img")
    const image = imageItem.appendChild(document.createElement('img'))
    image.setAttribute('src', product.imageUrl)
    image.setAttribute('alt', product.altTxt)
    }

function addContent(parent, article, product){
    parent.classList.add("cart__item__content")
    const description = parent.appendChild(document.createElement("div"))
    description.classList.add("cart__item__content__description")
    const title = description.appendChild(document.createElement("h2"))
    title.textContent = product.name
    const color = description.appendChild(document.createElement("p"))
    color.textContent = article.dataset.color
    const price = description.appendChild(document.createElement("p"))
    price.textContent = `${product.price} €`
}

function addSettings(parent, quant){
    const settings = parent.appendChild(document.createElement("div"))
    settings.classList.add("cart__item__content__settings")
    const quantity = settings.appendChild(document.createElement("div"))
    quantity.classList.add("cart__item__content__settings__quantity")
    const number = quantity.appendChild(document.createElement("p"))
    number.innerHTML = `Qté : ${quant}`
    quantity.insertAdjacentHTML('beforeend', `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quant}"></input>`)
    const deleteDiv = settings.appendChild(document.createElement("div"))
    deleteDiv.classList.add("cart__item__content__settings__delete")
    const deleteButton = deleteDiv.appendChild(document.createElement("p"))
    deleteButton.textContent = "Supprimer"
    deleteButton.classList.add("deleteItem")
}

function addArticle(items, product, id, color, quantity){

    let article = items.appendChild(document.createElement('article'))
    article.classList.add("cart_item")
    article.setAttribute('data-id', id)
    article.setAttribute('data-color', color)
    addImage(article, product)
    const itemContent = article.appendChild(document.createElement("div"))
    addContent(itemContent, article, product)
    addSettings(itemContent, quantity)
}

//Functions for deleting item 
const findButton = (element, index)=>{
    let button = element[index].closest("p")
    return button
}

function findProductArticle(button, index){
    let productArticle = button[index].closest("article.cart_item")
    return productArticle
}

function findIndexInCart(article, cart){
    let productId = article.dataset.id
    let productColor = article.dataset.color    
    for (let i=0; i < cart.length; i++){
        if(productId === cart[i].id && productColor === cart[i].color){
            return i
        }
    }
}

const removeElementFromStorage = (cart, index) => {
    cart.splice(index, 1)
    console.log(cart)
    localStorage.setItem("product", JSON.stringify(cart))
}

function deleteItem(){
    const deleteButton = document.querySelectorAll(".deleteItem")

    for(let i=0;i<deleteButton.length;i++){
        
        let thisButton = findButton(deleteButton, i)
        let productArticle = findProductArticle(deleteButton, i)
        thisButton.addEventListener(
            "click",
            (event)=>{
                event.preventDefault()
                
                let cartIndex = findIndexInCart(productArticle, cart)

                removeElementFromStorage(cart, cartIndex)
            
                productArticle.remove()
                changeQuantity()
            }
        )
    }
}   

function retrieveProductData() {
    fetch("http://localhost:3000/api/products")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })

        .then(
            function addProducts(productData) {

                for(let product of cart){
                    let productN = searchProduct(product.id, productData)
                    addArticle(cartItems, productN, product.id, product.color, product.quantity)
                }
            }
        )

        .then(
            function changeSettings(){

                changeQuantity()
                
                deleteItem()
            }   
        )
        
        .catch(
            function (error) {
            console.log(Error)
            }
        )
}
retrieveProductData()



