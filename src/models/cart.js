const fileSystem = require('fs');
const path = require('../util/path');

// needs a 'data' folder one level bellow this project
const _cartFile = path('..','..','data','cart.json');

module.exports = class Cart{
    static get(callback) {
        fileSystem.readFile(_cartFile, (exception, fileData) => {
            if(exception != null) {
                callback(new Map());
                return;
            }

            try {
                callback(new Map(JSON.parse(fileData)));
            } catch(e) {
                callback(new Map());
            }
        });
    }

    static addProduct(product, callback) {
        Cart.get(cart => {
            let previusQuantity = cart.get(product.id) ?? 0;
            cart.set(product.id, previusQuantity + 1);

            fileSystem.writeFile(_cartFile, JSON.stringify(Array.from(cart.entries())),
            (exception) => {
                if(exception != null) 
                    console.log(exception);
                
                callback();
            });
        }); 
    }

    static removeProductById(id, callback) {
        Cart.get(cart => {
            if(!cart.has(id)) {
                callback();
                return;
            }

            let previusQuantity = cart.get(id);
            cart.set(id, previusQuantity - 1);
            if(cart.get(id) == 0)
                cart.delete(id);


            fileSystem.writeFile(_cartFile, JSON.stringify(Array.from(cart.entries())),
            (exception) => {
                if(exception != null) 
                    console.log(exception);
                
                callback();
            });
        }); 
    }
};