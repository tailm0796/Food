class Cart {
  constructor(oldCart) {
    if(oldCart)
      this.listProduct = oldCart.listProduct || [];
      this.totalPrice = oldCart.totalPrice || 0;
      this.totalQuantity = oldCart.totalQuantity || 0;
  }
  addtoCart(product, id) {
    let storedItem = this.listProduct.find(el => el.id === id);
    if (storedItem) {
      storedItem.qty ++;
      storedItem.price = product.price * storedItem.qty;
    } else {
      let newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        info: product,
        qty: 0,
      };
      storedItem = newProduct;
      storedItem.qty++;
      storedItem.price = product.price * storedItem.qty;
      this.listProduct.push(newProduct);
    }
    this.totalPrice += product.price;
    this.totalQuantity++;
  }
  deleteFromCart(id) { 
    let storedItem = this.listProduct.find(el => el.id === id);
    let index = this.listProduct.findIndex(el => el.id === id);
    if(storedItem) {
      this.totalPrice -= storedItem.price;
      this.totalQuantity -= storedItem.qty;
      this.listProduct.splice(index,1);
    }
  }
  editQtyItem(id, qty) {
    let storedItem = this.listProduct.find(el => el.id === id);
    this.totalPrice -= storedItem.price;
    this.totalQuantity -= storedItem.qty;

    storedItem.qty = qty;
    storedItem.price = storedItem.info.price * qty;
    
    this.totalPrice += storedItem.price;
    this.totalQuantity += storedItem.qty;
  }

}
module.exports = Cart;