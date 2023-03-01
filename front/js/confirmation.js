const orderId = document.getElementById('orderId')
let params = new URLSearchParams(window.location.search)
let id = params.get('orderid')
orderId.textContent = id