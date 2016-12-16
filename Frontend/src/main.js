/**
 * Created by chaika on 25.01.16.
 */

$(document).ready(function (){

    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');


    PizzaCart.initialiseCart();
    var url = window.location.href;
    if(url == "http://localhost:5050/") {
        PizzaMenu.initialiseMenu();
    }
   // var fs = require('fs');
    //This code will execute when the page is ready

});