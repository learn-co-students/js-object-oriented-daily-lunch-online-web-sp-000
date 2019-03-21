// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

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
    });
  }
  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    });
  }
  meals() {
    let neighborhoodMeals = this.deliveries().map(delivery => {
      return delivery.meal()});
      let uniqueNeighborhoodMeals = [...new Set(neighborhoodMeals)];
      return uniqueNeighborhoodMeals;
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
    });
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    });
  }

  totalSpent() {
    return this.meals().map(meal => {
      return meal.price
      }).reduce((total, price) => (total += price), 0)
  }
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
      return delivery.mealId === this.id;
    });
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer();
    });
  }
  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    });
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }
} 
