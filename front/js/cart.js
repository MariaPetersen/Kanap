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
                let totalPriceAll = 0
                let totalQuantityAll = 0
                addTotal(cart, productData, totalPriceAll, totalQuantityAll)
                changeQuantity(inputQuantity, productData, totalPriceAll, totalQuantityAll)              
                deleteItem(productData, totalPriceAll, totalQuantityAll)
            }
        )

        .catch(
            function (error) {
            console.log(Error)
            }
        )
}
retrieveProductData()

//DOM elements
const cartItems = document.getElementById("cart__items")
const inputQuantity = document.getElementsByName('itemQuantity')

let cart = localStorage.getItem("product")
                cart = JSON.parse(cart)

//Function to find product in API 
function searchProduct(proId, productData){
    for (let i=0; i < productData.length; i++){
        if(productData[i]._id === proId)
        return productData[i]
    }
}

//Functions to add cart items to page
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

//Functions to calculate total
function calculateTotalPrice (product, item){
    let quantity = parseInt(product.quantity)
    let price = parseInt(item.price)
    let totalPrice = price * quantity
    return totalPrice
}

function insertTotalPrice (totalPriceAll, totalQuantityAll){
    const totalElement = document.getElementById("totalPrice")
    const totalQuantityElement = document.getElementById("totalQuantity")
    totalElement.innerHTML = totalPriceAll
    totalQuantityElement.innerHTML = totalQuantityAll
}

function addTotal (cart, productData, totalPriceAll, totalQuantityAll){
    for(let product of cart){
        let productN = searchProduct(product.id, productData)
        let totalPrice = calculateTotalPrice(product, productN)
        totalPriceAll = totalPriceAll + totalPrice
        totalQuantityAll = parseInt(totalQuantityAll) + parseInt(product.quantity)  
    }
    insertTotalPrice(totalPriceAll, totalQuantityAll)
}
//Functions for changing quantity 

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

const setQuantity = (input) => {
    input.setAttribute(
        "value",
        input.value
    )
    let thisParagraph = input.previousElementSibling
    thisParagraph.textContent = `Qté : ${input.value}`
}

function findItemInCart(id, color, array){
    for (let i=0; i < array.length; i++){
        if(id === array[i].id && color === array[i].color){
            return array[i]
        }
    }
}

const updateStorageQuantity = (item, array, input) => {
    item.quantity = input.value
    localStorage.setItem("product", JSON.stringify(array))
}

function changeQuantity(inputQuantity, productData, totalPriceAll, totalQuantityAll){    
    for (let i=0; i < inputQuantity.length; i++){
        let thisInput = findInput(i, inputQuantity)
        let productId = findProductId(inputQuantity, i)
        let productColor = findProductColor(inputQuantity, i)
        thisInput.addEventListener(
            "change",
            (event) =>{
                event.preventDefault()
                setQuantity(thisInput)
                let cartItem = findItemInCart(productId, productColor, cart)
                updateStorageQuantity(cartItem, cart, thisInput)
                addTotal (cart, productData, totalPriceAll, totalQuantityAll)
            }
        )
    }
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
    localStorage.setItem("product", JSON.stringify(cart))
}

function deleteItem(productData, totalPriceAll, totalQuantityAll){
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
                changeQuantity(inputQuantity, productData, totalPriceAll, totalQuantityAll)
                addTotal (cart, productData, totalPriceAll, totalQuantityAll)
            }
        )
    }
}   

//ORDER FORM 

//DOM elements

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")

//RegEx

const regexOnlyText = /^[a-zA-ZÀ-ú\-\s]+[a-zA-ZÀ-ú\-\s]+$/
const regexEmail = /^([a-zA-Z0-9_\-\.]+)@(([a-zA-Z0-9\-]+\.)+)([a-zA-Z]{2,4})$/
const regexAddress = /^[\d*][a-zA-Z0-9_\-\.]+/

firstName.addEventListener (
    "input", (event) => {
        if (!regexOnlyText.test(firstName.value)){
            console.log(regexOnlyText.test(firstName.value))
            firstNameErrorMsg.textContent = "Le champs n'est pas valide"
        } else {
            firstNameErrorMsg.textContent = ""
        }
    }
    )
lastName.addEventListener(
    "input", (event) => {
        event.preventDefault()
        if (!regexOnlyText.test(lastName.value)){
            lastNameErrorMsg.textContent = "Le champs n'est pas valide"
        }else {
            lastNameErrorMsg.textContent = ""
        }
    }
    )
address.addEventListener (
    "input", (event) => {
        event.preventDefault()
        if (!regexAddress.test(address.value)){
            console.log(regexAddress.test(address.value))
            addressErrorMsg.textContent = "Le champs n'est pas valide"
        }else {
            addressErrorMsg.textContent = ""
        }
    }
    )
city.addEventListener (
    "input", (event) => {
        event.preventDefault()
        if (!regexOnlyText.test(city.value)){
            cityErrorMsg.textContent = "Le champs n'est pas valide"
        }else {
            cityErrorMsg.textContent = ""
        }
    }
    )
email.addEventListener(
    "input", (event) => {
        event.preventDefault()
        if (!regexEmail.test(email.value)){
            console.log(regexEmail.test(email.value))
            emailErrorMsg.textContent = "Le champs n'est pas valide"
        }else {
            emailErrorMsg.textContent = ""
        }
    }
    )

//ORDER 


const order = document.getElementById("order")
order.addEventListener(
    "click", 
    (event)=> {
        event.preventDefault()
        if (regexOnlyText.test(firstName.value)
            && regexOnlyText.test(lastName.value)
            && regexAddress.test(address.value)
            && regexOnlyText.test(city.value)
            && regexEmail.test(email.value)
        ){
            // const contact = createContact()
            let productList = localStorage.getItem("product")
            productList = JSON.parse(productList)
            let products = []
            for (let product of productList){
                products.push(product.id)
            }
            console.log(products)
            // const products = createProductList()
            fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({   
                    contact : {
                        firstName : firstName.value,
                        lastName : lastName.value,
                        address : address.value,
                        city : city.value,
                        email : email.value
                    },
                    products : products
                })
            })
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
            
                
            })
            .then(function (data){
                console.log(data.orderId)
                let url = new URL ("http://127.0.0.1:5500/front/html/confirmation.html")
                url.searchParams.append('orderid', data.orderId)
                console.log(url)
                window.location.assign(url)
                }
            )
            .catch(
                function (error) {
                console.log(Error)
                }
            )
        }
            // sendOrder (contact, products)
        }

)

function Contact (firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
}

function createContact () {
    let contact = new Contact(firstName.value, lastName.value, address.value, city.value, email.value)
    
    contact = JSON.stringify(contact)
    console.log(contact)
    return contact
}

function createProductList (){
    let productList = localStorage.getItem("product")
    productList = JSON.parse(productList)
    let products = []
    for (let product of productList){
        products.push(product.id)
    }
    products = JSON.stringify(products)
    console.log(products)
    return products
}

function sendOrder (contact, products){
    fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({contact, products})
    })
    .then(function (response) {
        if (response.ok) {
            return response = response.json()
        }
    })
    .then (function (){console.log(response)}
    )
    .catch(
        function (error) {
        console.log(Error)
        }
    )
}

// fetch('http://localhost:3000/api/order', {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
//     body: contact, productList 
// })

// let result = await response.json()
// console.log(result)


//Request 

// let response = await fetch('/article/fetch/post/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(user)
//   });
  
//   let result = await response.json();
//   alert(result.message);