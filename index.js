// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;


class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(element) {
        return element.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(function(element) {return element.neighborhoodId === this.id}.bind(this));
  }

  meals() {
    const meals = this.customers().map(function(element) {return element.meals()});
    const merged = Array.prototype.concat.apply([], meals);
    return [...new Set(merged)];
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(element) {
        return element.customerId === this.id;
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map( function(element) { return element.meal() });
  }

  totalSpent() {
    return this.meals().map(
      function(element) {
        return element.price;
      }
    ).reduce( function(total, amount) {return total + amount});
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = parseInt(price);
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(element) {
        return element.mealId === this.id;
      }.bind(this)
    )
  }

  customers() {
    const customers = this.deliveries().map( function(element) {return element.customer()} );
    return [...new Set(customers)];
  }

  static byPrice() {
    return store.meals.sort(
      function(a, b) {
        return b.price - a.price;
      }
    )
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(element) {
        return element.id === this.mealId;
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function(element) {
        return element.id === this.customerId;
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(element) {
        return element.id === this.neighborhoodId;
      }.bind(this)
    )
  }
}
