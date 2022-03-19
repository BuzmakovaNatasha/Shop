const cartTotal = {
    template: `<div class="order">
                    <div class="order__text_mini">sub total<span>$ {{$root.$refs.cart.changeTotalValueInCart}}</span></div>
                    <div class="order__text">grand total<span>$ {{$root.$refs.cart.changeTotalValueInCart}}</span></div>
                    <button>proceed to checkout</button>
                </div>`,
};

export default cartTotal;