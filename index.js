// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries = () => store.deliveries.filter(({neighborhoodId}) => neighborhoodId === this.id);

  customers = () => store.customers.filter(({neighborhoodId}) => neighborhoodId == this.id);

  meals = () => this.deliveries().map(delivery => delivery.meal()).reduce((arr, meal) => arr.includes(meal) ? arr : arr.concat(meal), []);
}

let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries = () => store.deliveries.filter(({customerId}) => customerId === this.id);
  meals = () => this.deliveries().map(delivery => delivery.meal());
  totalSpent = () => this.meals().reduce((sum, meal) => sum + meal.price, 0);
}

let mealId = 0;

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries = () => store.deliveries.filter(({mealId}) => mealId === this.id);
  customers = () => this.deliveries().reduce((arr, delivery) => arr.find(({customerId}) => customerId === delivery.customerId) ? arr : arr.concat(delivery), []).map(delivery => delivery.customer());
  static byPrice() {
    return store.meals.slice().sort((a, b) => - a.price + b.price)
  }
}

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal = () => store.meals.find(({id}) => id === this.mealId);
  customer = () => store.customers.find(({id}) => id === this.customerId);
  neighborhood = () => store.neighborhoods.find(({id}) => id === this.neighborhoodId);
}
