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

  meals() {
    let allMeals = this.deliveries().map(delivery => delivery.meal())
    return [...new Set(allMeals)]
  }
}

class Meal {
  constructor(title, price = 0) {
    this.id = ++ mealId
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price-a.price});
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
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    let i = 0
    let prices = this.meals().map(meal => meal.price)
    prices.forEach(price => i += price)
    return i
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
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
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId )
  }
}
