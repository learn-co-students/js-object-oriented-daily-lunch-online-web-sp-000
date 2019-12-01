let store = { neighborhoods: [], deliveries: [], customers: [], meals: [] }

let neighborhoodId = 0;
let deliveryId = 0;
let customerId = 0;
let mealId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.neighborhoodId === this.id;
    }.bind(this))
  }
  
  customers() {
      return store.customers.filter(function(customer) {
        return customer.neighborhoodId === this.id 
      }.bind(this))
  }
  
  meals() {
    let x = this.deliveries().map(delivery => delivery.mealId);
    // return store.meals.filter(function(meal) {
    //   return x.includes(meal.id)})
    return store.meals.filter(meal => x.includes(meal.id))
   }
  
}



class Customer {
  constructor(name, neighborhoodId) {
  this.name = name;
  this.neighborhoodId = neighborhoodId;
  this.id = ++customerId;
  store.customers.push(this);
  }
  
  
  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  
  
  meals() {
   return this.deliveries().map(function(delivery) {
     return delivery.meal();
   })
  }
  
  
  totalSpent() {
    return this.meals().map(meal => meal.price).reduce((a, b) => a + b, 0);
  }
}



class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  
  customers() {
    return this.deliveries().map(delivery => delivery.customer()
    );
  }
  
  static byPrice() {
    // return store.meals.sort(function (a, b) {
    //   return b.price - a.price})
    return store.meals.sort((a,b) => b.price - a.price); 
  }
}


class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  
  meal() {
    return store.meals.find(function(meal) {
      return this.mealId === meal.id;
    }.bind(this))
  }
  
  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }
  
  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
  
}