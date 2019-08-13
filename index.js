// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodIdCounter = 0;
let mealIdCounter = 0;
let customerIdCounter = 0;
let deliveryIdCounter = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodIdCounter;
    store.neighborhoods.push(this);
  }

  // deliveries() {
  //   return store.deliveries.filter(
  //     function(delivery) {
  //       return delivery.neighborhoodId === this.id
  //     }.bind(this)
  //   );
  // }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    let uniqueMeals = [];
    let allMeals = this.deliveries().map(delivery => delivery.meal())
    for (const index in allMeals) {
      if (!uniqueMeals.includes(allMeals[index])) {
        uniqueMeals.push(allMeals[index])
      }
    }
    return uniqueMeals
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerIdCounter;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(function(delivery) {
      return delivery.meal()
    });
  }

  totalSpent() {
    // return this.meals().reduce(function(agg, meal){
    //   return agg + meal.price
    // }, 0)
    return this.meals().reduce(((agg, meal) => agg + meal.price), 0)
  }

}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealIdCounter;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    return [...store.meals].sort(function(a,b) {
        return b.price - a.price;
    });
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryIdCounter;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }

  customer() {
    return store.customers.find(
      function(customer){
        return customer.id === this.customerId
      }.bind(this)
    );
  }
}
