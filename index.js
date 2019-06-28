// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  };

  deliveries() {
    return store.deliveries.filter(function(d){
      return d.neighborhoodId == this.id;
    }.bind(this));
  };

  customers() {
    return deliveries.reduce(function(arr, d){
      arr.push d.customer();
      return arr;
    }, [])
  }
}

class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };
}

class Customer {
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;

    store.customers.push(this);
  };
}

class Delivery {
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;

    store.deliveries.push(this);
  };

  meal() {
    return store.meals.find(function(m){
      return m.id ===this.mealId;
    }.bind(this));
  };

  neighborhood() {
    return store.neighborhoods.find(function(n){
      return n.id === this.neighborhoodId;
    }.bind(this));
  };

  customer() {
    return store.customers.find(function(c){
      return c.id === this.customerId;
    }.bind(this));
  };
}
