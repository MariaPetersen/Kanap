//Item variable
const items = document.getElementById('items')

//Function for creating article instance
const createProductInstance = (items, product) => {
    const productLink = items.appendChild(document.createElement('a'))
    productLink.setAttribute('href', `./product.html?id=${product._id}`)
    productLink.classList.add("items", "item")
    const productArticle = productLink.appendChild(document.createElement('article'))
    createProductImg(productArticle, product)
    createProductTitle(productArticle, product)
    createProductDescription(productArticle, product)   
}

//Functions for creating elements of article
const createProductImg = (productArticle, product) => {
    const productImg = productArticle.appendChild(document.createElement('img'))
    productImg.setAttribute('src', `${product.imageUrl}`)
    productImg.setAttribute('alt', `${product.altTxt}`)
}

const createProductTitle = (productArticle, product) => {
    const productTitle = productArticle.appendChild(document.createElement('h3'))
    productTitle.textContent = product.name
    productTitle.classList.add("productName")
}

const createProductDescription = (productArticle, product) => {
    const productDescription = productArticle.appendChild(document.createElement('p'))
    productDescription.textContent = product.description 
    productDescription.classList.add("productDescription")
}


//Function for calling API
const retrieveProductData = () => fetch("http://localhost:3000/api/products")
.then(function(res){
    if (res.ok){
        return res.json();
    }
})
.then(function(data){
    for (product of data){          
        createProductInstance(items, product)
    }
})
.catch(function(err){
    console.log("Error")
})
   
retrieveProductData()
