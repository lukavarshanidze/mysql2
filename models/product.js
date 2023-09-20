const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.description, this.imageUrl]
        )
    };


    static fetchAll() {
        return db.execute('SELECT * FROM products')
    };

    static deleteProduct(id) {
        return db.execute('DELETE FROM products WHERE id = ?', [id])
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    };

    updateProduct(productId) {
        db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
            [
                this.title,
                this.price,
                this.description,
                this.imageUrl,
                productId,
            ])
    };


}
