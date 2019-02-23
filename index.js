// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let mealId = 0;
let neighborhoodId = 0;
let customerId = 0;
let deliveryId = 0;


class Neighborhood {
  constructor(name) {
    this.id = ++ neighborhoodId
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++ mealId
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return store.customers.find(customer => customer)
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++ customerId
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals () {
    
  }
}

class Delivery {
  constructor(mealId, customerId, neighborhoodId) {
    this.id = ++ deliveryId
    this.name = name;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId )
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId )
  }

  neighborhood() {
    return store.neighborhood.find(neighborhood => neighborhood.id === this.neighborhoodId )
  }
}
