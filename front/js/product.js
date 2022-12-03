const itemImage = document.querySelector(".item__img")
const productTitle = document.getElementById("title")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const productColors = document.getElementById("colors")


const url = window.location.href
const productURL = new URL(url)
const $productId = productURL.searchParams.get('id')



console.log($productId)


itemImage.innerHTML = "<img src='../images/logo.png>'' alt='Photographie d'un canapé'"

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