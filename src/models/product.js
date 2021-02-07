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

    constructor(title){
        this.title = title;
    }

    save(callback) {
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