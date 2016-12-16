/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var API = require('../API');
var Pizza_List = null;


//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var url = window.location.href;

if(url == "http://localhost:5050/"){
var all = document.getElementById("all");

all.onclick = function () {
  //  alert("All clicked");
    filterPizza('all');
}

var meat = document.getElementById("meat");

meat.onclick = function () {
   // alert("meat clicked");
    filterPizza('meat');
}

var vegan = document.getElementById("vegan");

vegan.onclick = function () {
   // alert("vegan clicked");
    filterPizza('vegan');
}

var ocean = document.getElementById("ocean");

ocean.onclick = function () {
   // alert("ocean clicked");
    filterPizza('ocean');
}

}



function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }
    if (typeof list != 'undefined'){
        list.forEach(showOnePizza);
        $(".count-all").text(pizza_shown.length);
    }
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    if (filter === 'all') {
        Pizza_List.forEach(function (pizza) {
            pizza_shown.push(pizza);
        });
    }
    else if (filter == 'vegan') {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (!pizza.content['meat'] && !pizza.content['ocean']) {
                pizza_shown.push(pizza);
            }
        });
    } else {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (pizza.content[filter]) {
                pizza_shown.push(pizza);
            }
        });
    }
    //Показати відфільтровані піци
    var $label_count = $(".count-all");
    $label_count.text(pizza_shown.length);
    showPizzaList(pizza_shown);

}

function initialiseMenu() {
    //Показуємо усі піци
    API.getPizzaList(function (err, data) {
        if(err == null) {
            Pizza_List = data;
        }else{
            console.log(err);
        }

    });
    showPizzaList(Pizza_List);

}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;