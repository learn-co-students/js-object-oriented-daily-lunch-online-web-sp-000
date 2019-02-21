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
    return store.deliveries.filter(
      function(delivery) {
        if (delivery.neighborhoodId === this.id) {
          return delivery;
        }
      }.bind(this)
    );
  }

  customers() {
    return [... new Set(this.deliveries().map(
      function(delivery) {
        return delivery.customer();
      }.bind(this))
    )];
  }

  meals() {
    const meals = store.deliveries.map(
      function(delivery) {
        if (delivery.neighborhoodId === this.id) {
          return delivery.meal();
        }
      }.bind(this)
    );
    return Array.from(new Set(meals));
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        if (delivery.customerId === this.id) {
          return delivery;
        }
      }.bind(this)
    );
  }

  meals() {
    return this.deliveries().map(
      function(delivery) {
          return delivery.meal();
      }.bind(this)
    );
  }

  totalSpent() {
    return this.meals().reduce(
      function(agg, el, i, arr) {
        agg += el.price;
        return agg;
      },
      0
    );
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
        if (delivery.mealId === this.id) {
          return delivery;
        }
      }.bind(this)
    );
  }

  customers() {
    return [... new Set(this.deliveries().map(
      function(delivery) {
        return delivery.customer();
      }.bind(this))
    )];
  }

  static byPrice() {
    return store.meals.sort(function (a,b) {
      return b.price - a.price;
    });
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    );
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    );
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    );
  }
}
