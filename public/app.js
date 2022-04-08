document.querySelectorAll('.price').forEach( node => {
  node.textContent = new Intl.NumberFormat('en-us', {
    currency: 'usd',
    style: 'currency'
  }).format(node.textContent)
})

const $cart = document.querySelector('#cart')

if ($cart) {
  $cart.addEventListener('click', event => {
    
  })
}