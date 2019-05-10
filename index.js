// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }
  deliveries(){
    let arr = store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      })
       return arr;
 }

   customers(){

   }
  // sayHello() {
  //   console.log(`Hello, my name is ${this.name}`);
  // }
}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.mealId === this.id;
        }.bind(this)
    );
  }

}

class Delivery{
  constructor(meal, customer, neighborhood){
    this.id = ++deliveryId;
    this.mealId = meal;
    this.customerId = customer;
    this.neighborhoodId = neighborhood;
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(
         function(meal) {
             return meal.id === this.mealId;
         }.bind(this)
     );
  }
  customer(){
    return store.customers.find(
         function(customer) {
             return customer.id === this.customerId;
         }.bind(this)
     );
  }
}

class Customer{
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.neighborhoodId = neighborhood;
    this.name = name;
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.customerId === this.id;
        }.bind(this)
    );
  }
  meals(){
     return this.deliveries().map(function(delivery){
       return delivery.meal();
     });
  }

}
