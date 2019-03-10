// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
// A meal has many customers
// A delivery belongs to a meal, belongs to a customer, and belongs to a neighborhood
// A customer has many deliveries
// A customer has many meals through deliveries
// A customer belongs to a neighborhood
// A neighborhood has many deliveries
// A neighborhood has many customers through deliveries
// A neighborhood has many meals through deliveries

let neighborhoodId = 1;
let mealId = 1;
let customerId = 1;
let deliveryId = 1;

class Neighborhood {
  
  constructor(name) {
    this.name = name;
    this.id = neighborhoodId++;
    store.neighborhoods.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id 
    })
  }
  
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id 
    })
  }
  
  meals() {
    let neighborhoodMeals = this.deliveries().map(delivery => {
      return delivery.meal()});
      let uniqueNeighborhoodMeals = [...new Set(neighborhoodMeals)]; 
      
      return uniqueNeighborhoodMeals;
    
    // [...new Set(numbers)]
    // var uniqueItems = Array.from(new Set(items))
    // return this.deliveries().map(delivery => {
    //   return delivery.meal})
      
      // let unique = [...new Set(neighborhoodMeals)]; 
      
  }
}

class Customer {
  
  
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = customerId++;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  
  
  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.customerId === this.id
    })
  }
  
  // the meal() method n the delivery class needs to be defined in order for THIS meals() method to work.
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  
  
  totalSpent() {
    return this.meals().map(meal => {
      return meal.price
      }).reduce((total, price) => (total += price), 0)
  }
    
  // totalSpent() {
  //   return this.meals().reduce((total, meal) => (total += meal.price), 0);
  // }
  
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }
  
  
  deliveries() {
    return store.deliveries.filter( delivery => {
      return delivery.mealId === this.id
    })
  }
  
  
  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
    // allCustomers = this.deliveries().map(delivery => delivery.customer());
    //   return [...new Set(allCustomers)];
  }
  
  
  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
  
  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
  }
  
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId
    })
  }
}