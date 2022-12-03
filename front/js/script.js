    //get the product data 

    const items = document.getElementById('items')

    const retrieveProductData = () => fetch("http://localhost:3000/api/products")
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(data){
        for (product of data){
            console.log(data)
            const createProductLink = () => {
                const productLink = items.appendChild(document.createElement('a'))
                productLink.setAttribute('href', `./product.html?id=${product._id}`)
                productLink.classList.add("items", "item")

                const createProductArticle = () => {
                    const productArticle = productLink.appendChild(document.createElement('article'))

                    const createProductImg = () => {
                        const productImg = productArticle.appendChild(document.createElement('img'))
                        productImg.setAttribute('src', `${product.imageUrl}`)
                        productImg.setAttribute('alt', `${product.altTxt}`)
                        productImg.classList.add("item__img")
                    }
                    createProductImg()

                    const createProductTitle = () => {
                        const productTitle = productArticle.appendChild(document.createElement('h3'))
                        productTitle.textContent = product.name
                        productTitle.classList.add("productName")
                    }
                    createProductTitle()

                    const createProductDescription = () => {
                        const productDescription = productArticle.appendChild(document.createElement('p'))
                        productDescription.textContent = product.description 
                        productDescription.classList.add("productDescription")
                    }
                    createProductDescription()
                }
                createProductArticle()
                
            }
            createProductLink()
        }
    })
    .catch(function(err){
        console.log("Error")
    })
   
retrieveProductData()
