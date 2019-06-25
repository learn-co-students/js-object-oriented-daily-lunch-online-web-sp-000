// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  }

  deliveries() {
    // neighborhood has_many deliveries -- WORKING
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id
      }.bind(this)
    );
  }

  customers() {
    // neighborhood has many customers through deliveries -- WORKING
    return store.customers.filter(
      function(customer) {
        return customer.deliveryId === this.deliveryId;
      }.bind(this)
    );
  }

  meals() {
    // neighborhood has many meals through deliveries
    return store.meals.filter(
      function(meal) {
        return meal.deliveryId === this.deliveryId;
      }.bind(this)
    );
  }
}

class Customer {
  constructor(name, neighborhood) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood;

    store.customers.push(this);
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(thid)
    );
  }

  deliveries() {
    // customer has many deliveries -- WORKING
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map (
      function(delivery) {
        return delivery.meal()
      }
    );
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.deliveryId === this.deliveryId;
      }.bind(find)
    );
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }
}

class Delivery {
  constructor(meal, neighborhood, customer) {
    this.id = ++deliveryId;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;

    store.deliveries.push(this);
  }

  meal() {
    // delivery belongs to meal -- WORKING
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    // delivery belongs to customer -- WORKING
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  neighborhood() {
    // delivery belongs to neighborhood -- WORKING
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }
}
