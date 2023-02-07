
cartItems = document.getElementById("cart__items")

let cart = localStorage.getItem("product")
                cart = JSON.parse(cart)

function retrieveProductData() {
    fetch("http://localhost:3000/api/products")
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })

        .then(
            function (productData) {
                let cart = localStorage.getItem("product")
                cart = JSON.parse(cart)

                for(let product of cart){

                    function search(pro, productData){
                        for (let i=0; i < productData.length; i++){
                            if(productData[i]._id === pro)
                            return productData[i]
                        }
                    }
            
                    let pro = product.id
                    let productN = search(pro, productData)

                    function addArticle(){
                        const article = cartItems.appendChild(document.createElement('article'))
                        article.classList.add("cart_item")
                        article.setAttribute('data-id', product.id)
                        article.setAttribute('data-color', product.color)
                
                        function addImage(){
                            const imageItem = article.appendChild(document.createElement('div'))
                            imageItem.classList.add("cart__item__img")
                            const image = imageItem.appendChild(document.createElement('img'))
                            image.setAttribute('src', productN.imageUrl)
                            image.setAttribute('alt', productN.altTxt)
                            }
                        addImage()

                        function addContent(){
                            itemContent = article.appendChild(document.createElement("div"))
                            itemContent.classList.add("cart__item__content")
                            description = itemContent.appendChild(document.createElement("div"))
                            description.classList.add("cart__item__content__description")
                            title = description.appendChild(document.createElement("h2"))
                            title.textContent = productN.name
                            color = description.appendChild(document.createElement("p"))
                            color.textContent = product.color
                            price = description.appendChild(document.createElement("p"))
                            price.textContent = `${productN.price} €`
                        }
                        addContent()

                        function addSettings(){
                            settings = itemContent.appendChild(document.createElement("div"))
                            settings.classList.add("cart__item__content__settings")
                            quantity = settings.appendChild(document.createElement("div"))
                            quantity.classList.add("cart__item__content__settings__quantity")
                            number = quantity.appendChild(document.createElement("p"))
                            number.innerHTML = `Qté : ${product.quantity}`
                            quantity.insertAdjacentHTML('beforeend', `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"></input>`)
                            deleteDiv = settings.appendChild(document.createElement("div"))
                            deleteDiv.classList.add("cart__item__content__settings__delete")
                            deleteButton = deleteDiv.appendChild(document.createElement("p"))
                            deleteButton.textContent = "Supprimer"
                            deleteButton.classList.add("deleteItem")
                        }
                        addSettings()

                    }
                    addArticle()
                }
            }
        )

        .catch(
            function (error) {
            console.log(Error)
            }
        )

        .then(
            function changeSettings(){

                function changeQuantity(){
                    const inputQuantity = document.getElementsByName('itemQuantity')
                    console.log(inputQuantity)
                    
                    
                    for (let i=0; i < inputQuantity.length; i++){
                        inputQuantity[i].addEventListener(
                            "change",
                            (event) =>{
                                let thisInput = inputQuantity[i].closest('input')

                                thisInput.setAttribute(
                                    "value",
                                    inputQuantity[i].value
                                )

                                let thisParagraph = thisInput.previousElementSibling
                                thisParagraph.textContent = `Qté : ${inputQuantity[i].value}`

                                function findProductId(element){
                                    let productArticle = element[i].closest("article.cart_item")
                                    let productId = productArticle.getAttribute("data-id")
                                    return productId
                                }

                                function findProductColor(element){
                                    let productArticle = element[i].closest("article.cart_item")
                                    let productColor = productArticle.getAttribute("data-color")
                                    return productColor
                                }
                                let productId = findProductId(inputQuantity)
                                let productColor = findProductColor(inputQuantity)

                                let cart = localStorage.getItem("product")
                                cart = JSON.parse(cart)
                                
                                function findItemInCart(productId, productColor, cart){
        
                                    for (let i=0; i < cart.length; i++){
                                        if(productId === cart[i].id && productColor === cart[i].color){
                                            return cart[i]
                                        }
                                    }
                                }
                                let cartItem = findItemInCart(productId, productColor, cart)

                                cartItem.quantity = inputQuantity[i].value

                                localStorage.setItem("product", JSON.stringify(cart))
                                console.log(localStorage)
                            }
                        )
                    }
                }
                changeQuantity()
                
                
                function deleteItem(){
                const deleteButton = document.querySelectorAll(".deleteItem")
                console.log(deleteButton)
                    for(i=0;i<deleteButton.length;i++){
                        console.log(deleteButton[i])
                        let thisButton = deleteButton[i].closest("p")
                        console.log(thisButton)
                        function findProductArticle(deleteButton){
                            let productArticle = deleteButton[i].closest("article.cart_item")
                            return productArticle
                        }
                        let productArticle = findProductArticle(deleteButton)

                        deleteButton[i].addEventListener(
                            "click",
                            (event)=>{
                                
                                let productId = productArticle.getAttribute("data-id")
                                let productColor = productArticle.getAttribute("data-color")
                                productArticle.remove()

                                function findIndexInCart(productId, cart){
        
                                    for (let i=0; i < cart.length; i++){
                                        if(productId === cart[i].id && productColor === cart[i].color){
                                            return i
                                        }
                                    }
                                }
                                let cartIndex = findIndexInCart(productId, cart)
                                cart.splice(cartIndex, 1)
                                console.log(cart)

                                localStorage.setItem("product", JSON.stringify(cart))
                                console.log(localStorage)
                                changeQuantity()
                            }
                        )
                    }
                }   
                deleteItem()
            }   
        )
}
retrieveProductData()



