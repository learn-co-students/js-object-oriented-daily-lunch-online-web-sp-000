// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    const meals = this.deliveries().map(delivery => delivery.meal());
    return [...new Set(meals)];
  }
}

class Delivery {
  constructor(mId, nId, cId) {
    this.mealId = mId;
    this.customerId = cId;
    this.neighborhoodId = nId;
    this.id = ++deliveryId;
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

class Customer {
  constructor(name, nId) {
    this.name = name;
    this.neighborhoodId = nId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return  store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals() {
    const allMeals = this.deliveries().map(delivery => delivery.meal());
    return [...allMeals];
  }

  totalSpent() {
    let total = 0;
    this.meals().forEach(meal => total += meal.price);
    return total;
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
    return  store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }

  static byPrice() {
    return store.meals.sort(function (a, b) {return a.price < b.price });
  }
}
