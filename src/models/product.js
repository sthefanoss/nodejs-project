const fileSystem = require('fs');
const path = require('../util/path');

// needs a 'data' folder one level bellow this project
const _productsFile = path('..','..','data','products.json');

module.exports = class Product{
    static getAll(callback) {
        fileSystem.readFile(_productsFile, (exception, fileData) => {
            if(exception != null) {
                callback([]);
                return;
            }

            try {
                let parsedData = JSON.parse(fileData);
                callback(parsedData);
            } catch(e) {
                callback([]);
            }
        });
    }

    static findById(id, callback) {
        Product.getAll(products => {
            callback(products.find(element => element.id == id));
        });
    }

    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }

    save(callback) {
        this.id = Date.now();
        Product.getAll((products) => {
            products.push(this);
            
            fileSystem.writeFile(_productsFile, JSON.stringify(products), (exception) => {
                if(exception != null) 
                    console.log(exception);
                
                callback();
            });
        }); 
    }
};