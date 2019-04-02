let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let neighborhoodIds = 0;
let mealIds = 0;
let customerIds = 0;
let deliveryIds = 0;


class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodIds++;
    store.neighborhoods.push(this);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }
}

class Meal {
  constructor(title, price = 0) {
    this.id = mealIds++;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = customerIds++;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = deliveryIds++;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
