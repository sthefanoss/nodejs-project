const dataBase = require('../util/database');

module.exports = class Cart{
    static get() {
        return dataBase.pool.execute(
            'SELECT * FROM cart_items',
        ).then(([entries, rows]) => {
           return new Map(entries.map(entry =>[Number(entry.product_id), Number(entry.quantity)]));
        });
    }

    static addProduct(id) {
        id = Number(id);
        return Cart.get().then(entries => {
            if(entries.has(id)) {
                return dataBase.pool.execute(
                    'UPDATE cart_items SET quantity=? WHERE product_id=?',
                    [entries.get(id)+1, id]
                );
            }

            return dataBase.pool.execute(
                'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
                [id, 1],
            );
        }); 
    }

    static subProduct(id) {
        id = Number(id);
        return Cart.get().then(entries => {
            if(!entries.has(id)) {
                return;
            }
            
            if(entries.get(id) > 1) {
            return dataBase.pool.execute(
                    'UPDATE cart_items SET quantity=? WHERE product_id=?',
                    [entries.get(id) - 1, id]
                );
            }

            return dataBase.pool.execute(
                'DELETE FROM cart_items where product_id=?',
                [id],
            );
        }); 
    }
};