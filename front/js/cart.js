
cartItems = document.getElementById("cart__items")

    function retrieveProductData() {
        fetch("http://localhost:3000/api/products")
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(function (productData) {
                let cart = localStorage.getItem("product")
                cart = JSON.parse(cart)
                console.log(cart)
                for(let product of cart){
                console.log(product)

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
                        price.textContent = `${productN.price * product.quantity} €`
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
            })
            .catch(function (error) {
                console.log(Error)
            })
}

retrieveProductData()
