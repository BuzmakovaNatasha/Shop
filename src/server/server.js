const express = require('express');
const fs = require('fs');
const app = express();

/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./src/public')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога на главной странице
 */
app.get('/api/products', (req, res) => {
    fs.readFile('./src/server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

/**
 * API Каталога на странице 'catalog.html'
 */
app.get('/api/catalog', (req, res) => {
    fs.readFile('./src/server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

/**
 * API Каталога на странице 'product{id}.html'
 */
app.get('/api/catalogPageProduct', (req, res) => {
    fs.readFile('./src/server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
    fs.readFile('./src/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

/**
 * API Описания товара на странице 'product.html'
 */
app.get('/api/product', (req, res) => {
    fs.readFile('./src/server/db/productShow.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

// ID товара, страницу, которого надо показать
app.post('/api/product/show', (req, res) => {
    fs.readFile('./src/server/db/productShow.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            // парсим текущий json с id
            const good = JSON.parse(data);
            good.content = [req.body];
            // пишем обратно
            fs.writeFile('./src/server/db/productShow.json', JSON.stringify(good), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

// Добавление нового товара в корзину
app.post('/api/cart', (req, res) => {
    fs.readFile('./src/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            // добавляем новый товар
            cart.contents.push(req.body);
            // пишем обратно
            fs.writeFile('./src/server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

// Увеличиваем количество товара при нажатии на кнопку "Добавить в корзину", если такой товар уже добавлен
app.put('/api/cart/add/:id', (req, res) => {
    fs.readFile('./src/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            // ищем товар по id
            const find = cart.contents.find(el => el.id === +req.params.id);
            // изменяем количество
            find.quantity += req.body.quantity;
            // пишем обратно
            fs.writeFile('./src/server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

// Изменяем количество товара (при изменении значения input с количеством товара в корзине)
app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./src/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            // ищем товар по id
            const find = cart.contents.find(el => el.id === +req.params.id);
            // изменяем количество
            if (find.quantity < req.body.quantity) {
                find.quantity += 1;
            } else if (find.quantity > req.body.quantity) {
                find.quantity -= 1;
            }
            // пишем обратно
            fs.writeFile('./src/server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

// Удаление товара из корзины
app.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./src/server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            // парсим текущую корзину
            const cart = JSON.parse(data);
            if (req.params.id == 'clearcart') { // если кликнули на кнопку очистить корзину
                cart.contents = []; // очищаем корзину
            } else {
                // ищем товар по id
                const findDel = cart.contents.find(el => el.id === +req.params.id);
                // удаляем товар            
                cart.contents.splice(cart.contents.indexOf(findDel), 1);
            }
            // пишем обратно
            fs.writeFile('./src/server/db/userCart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

/**
 * Запуск сервера
 * @type {string|number}
 */
const port = 3000;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});