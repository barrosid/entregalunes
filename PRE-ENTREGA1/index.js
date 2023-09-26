class Productmanager {

    constructor (){
        this.products = []
    }
     
    getproducts(){
        console.log(this.products);
        return this.products
    }

    getproductbyId(idProduct){
        const product = this.products.find((p) => p.id === idProduct)
        if(!product){
            console.log('Not found')
            return
        }
        return product
    }

    addProduct(product){
        const { title, description, thumbnail, price, stock, code} = product
        if (!title || !description || !price || !stock || !code || !thumbnail){
            console.log('Some data is missing')
            return
        }
        const isCodeRepeat = this.products.some(p => p.code === code)
        if (isCodeRepeat){
            console.log('Code already used');
            return
        }
        let id
        if(!this.products.length){
            id = 1
        } else {
            id = this.products[this.products.length - 1].id + 1
        }
        const newProduct = { id, ...product }
        this.products.push(newProduct)
        console.log('Product added')
        return newProduct
    }
}


const manager1 = new Productmanager()
manager1.addProduct({
    title: 'Paty',
    description: 'hamburquesa',
    price: 1500,
    code: 'paty40459',
    stock: 25,
})
manager1.addProduct({
    title: 'Vienissima',
    description : 'salchicha',
    price: 1000,
    code: 'vieni40450',
    stock: 50,
})
manager1.getproducts()