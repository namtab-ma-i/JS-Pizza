/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../Storage');
var API = require('../API');


//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $label_count = $(".count");
var $total_sum = $(".total-num");

var $clear_all = $(".clear-all-button");

var a = document.getElementById("clear-all");

a.onclick = function () {
    Cart = [];
    Storage.set('cart', Cart);
    updateCart();
}

var buy = document.getElementById("create-order");

buy.onclick = function () {
    Storage.set('cart', Cart);

    var url = window.location.href;
    url = 'http://localhost:5050/order.html';
    window.location.href = url;
    initialiseCart();
}


function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var node = {
        pizza: pizza,
        size: size,
        quantity: 1
    };

    var is = 0;
    Cart.forEach(function(item){
        if(item.pizza.id === pizza.id && item.size === size){
            item.quantity +=1;
            is = 1;
        }
    });
    if(!is) {
        //Приклад реалізації, можна робити будь-яким іншим способом
        Cart.push(node);
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика

    var i = parseInt(Cart.indexOf(cart_item));
    Cart.splice(i,1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    var cache = Storage.get('cart');
    Cart = cache;
    updateCart();
}

function totalSum(){
    var res=0;
    Cart.forEach(function(v){
        res += parseInt(v.pizza[v.size].price)*parseInt(v.quantity);
    });
    return res;
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    $label_count.text(Cart.length);
    $total_sum.text(totalSum);

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem({pizza : cart_item.pizza, size: cart_item.size, quantity: cart_item.quantity});

        var $node = $(html_code);

       // $node.find(".good-price").text(cart_item.quantity * cart_item.pizza[cart_item.size].price);

        $node.find(".button-plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".button-minus").click(function(){
            cart_item.quantity -= 1;

            if(cart_item.quantity<=0) removeFromCart(cart_item);

            updateCart();
        });

        $node.find(".button-delete").click(function(){
            removeFromCart(cart_item);

            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    Storage.set('cart', Cart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;