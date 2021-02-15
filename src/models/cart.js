const fileSystem = require('fs');
const path = require('../util/path');

// needs a 'data' folder one level bellow this project
const _cartFile = path('..','..','data','cart.json');

module.exports = class Cart{
    static get(callback) {
        fileSystem.readFile(_cartFile, (exception, fileData) => {
            if(exception != null) {
                callback({products: [], totalPrice: 0});
                return;
            }

            try {
                let parsedData = JSON.parse(fileData);
                callback(parsedData);
            } catch(e) {
                callback({products: [], totalPrice: 0});
            }
        });
    }


    static addProduct(product, callback) {
        Cart.get(cart => {
            cart.totalPrice += Number(product.price);
            let productIndex = cart.products.findIndex(element => element.id == product.id);
            
            if(productIndex == -1) {
                cart.products.push({id: product.id, quantity: 0});
                productIndex = cart.products.length - 1;
            }
            
            cart.products[productIndex].quantity++;

            fileSystem.writeFile(_cartFile, JSON.stringify(cart), (exception) => {
                if(exception != null) 
                    console.log(exception);
                
                callback();
            });
        }); 
    }
};