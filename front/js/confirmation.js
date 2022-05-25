let currentUrl = new URL(window.location.href);
let params = new URLSearchParams(currentUrl.search);
let orderId = params.get("id");

console.log(orderId)

document.querySelector('#orderId').textContent = orderId

/*<div class="confirmation">
<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId"><!-- 65431343444684674 --></span></p>
</div>*/