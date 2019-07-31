// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

let customerId = 0;

let mealId = 0;

let deliveryId = 0;

class Neighborhood {
  constructor( name ) {
    this.id = neighborhoodId++;
    this.name = name;

    store.neighborhoods.push(this);
  }

  //A neighborhood has many deliveries. Returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  };

  //A neighborhood has many customers through deliveries. Returns all of the customers that live in a particular neighborhood
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  };
  //A neighborhood has many meals through deliveries. // returns a unique list of meals that have been ordered in a particular neighborhood - do last
  meals() {
    let meals = this.deliveries().map(delivery => delivery.meal());
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  };
};

class Customer {
  constructor( name, neighborhoodId ) {
    this.id = customerId++;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }
  //A customer has many deliveries
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    });
  };
  //A customer has many meals through deliveries
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal(); //delivery belongs to meal
    });
  };
  //returns the total amount that the customer has spent on food.
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  };

};

class Meal {
  constructor( title, price ) {
    this.id = mealId++;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  }
  //A meal has many deliveries
  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
    });
  };
  //Has many customers through delivery. A meal has many customers. /returns all the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  };
  //a class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
  static byPrice() {
    return store.meals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  };
};

class Delivery {
  constructor( mealId, neighborhoodId, customerId) {
    this.id = deliveryId++;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  };

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  };

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  };
};
