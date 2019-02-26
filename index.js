// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let nId = 0;
let cId = 0;
let mId = 0;
let dId = 0;

/*
has many deliveries
has many customers through deliveries
has many meals through deliveries
*/
class Neighborhood {
  constructor(name) {
    this.id = ++nId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.neighborhoodId === this.id;
    })
  }

  customers() {
    return store.customers.filter((customer) => {
      return customer.neighborhoodId === this.id;
    })
  }

  meals() {
    return [...new Set(this.deliveries().map((delivery) => {
      return delivery.meal();
    }))]
  }
}

/*
has many deliveries
has many meals through deliveries
belongs to a neighborhood
*/
class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++cId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id;
    })
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent() {
    const reduceCost = function(agg, el) {
      return agg + el.price;
    };
    return this.meals().reduce(reduceCost, 0);
  }
}

/*
has many customers
*/
class Meal {
  constructor(title, price) {
    this.id = ++mId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id;
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice() {
    const sorted = [...store.meals];
    return sorted.sort((a, b) => {
      return b.price - a.price;
    }) 
  }
}

/*
belongs to meal
belongs to customer
belongs to neighborhood
*/
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++dId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find((meal) => {
      return meal.id === this.mealId;
    })
  }

  customer() {
    return store.customers.find((customer) => {
      return customer.id === this.customerId;
    })
  }

  neighborhood() {
    return store.neighborhoods.find((neighborhood) => {
      return neighborhood.id === this. neighborhoodId;
    })
  }
}