// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(c => c.neighborhoodId === this.id);
  }

  meals() {
    let deliveries = store.deliveries.filter(d => d.neighborhoodId = this.id)
    let meals = deliveries.map(d => d.meal())
    let unique = [];
    meals.forEach(c => {
      if (unique.indexOf(c) < 0) { unique.push(c) }
    });
    return unique;
  }
}

let customerId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(d => d.meal());
  }

  totalSpent() {
    const adder = (agg, el) => agg + el.price;
    return this.meals().reduce(adder, 0);
  }
}

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(d => d.mealId === this.id);
  }

  customers() {
    let deliveries = store.deliveries.filter(d => d.mealId === this.id);
    let customers = deliveries.map(d => d.customer());
    let unique = [];
    customers.forEach(c => {
      if (unique.indexOf(c) < 0) {
        unique.push(c);
      }
    });
    return unique;
  }

  static byPrice() {
    return store.meals.sort((a, b) => {
      return b.price - a.price;
    });
  }
}

let deliveryId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++mealId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(m => m.id === this.mealId);
  }
  customer() {
    return store.customers.find(c => c.id === this.customerId);
  }
  neighborhood() {
    return store.neighborhoods.find(n => n.id === this.neighborhoodId);
  }
}
