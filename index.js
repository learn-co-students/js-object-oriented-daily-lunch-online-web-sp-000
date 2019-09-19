// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;




class Neighborhood {
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.neighborhoodId === this.id;
        }.bind(this)
    );
  }
  customers() {
    return store.customers.filter(
        function(customer) {
            return customer.neighborhoodId === this.id;
        }.bind(this)
    );
  }

  meals() {
    let meals = this.deliveries().map(delivery => delivery.meal());
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  };
}




class Meal {
  constructor(title,price){
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.mealId === this.id;
        }.bind(this)
    );
  }
  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }
  //Has many customers through delivery. A meal has many customers. /returns all the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
// returns this meals deliveries customers

  static byPrice() {
    const numberSorter = function (num1, num2) {
      return num2.price - num1.price;
    };
    return store.meals.sort(numberSorter)
  }
}




class Customer {
  constructor(name,neighborhoodId){
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(
        function(delivery) {
            return delivery.customerId === this.id;
        }.bind(this)
    );
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal();
    });
  }

  totalSpent(){
    const reduceProductPrices = function (agg, el, i, arr) {
      return agg + el.price;     // zbroji sve el.price (loop)
    };
    return this.meals().reduce(reduceProductPrices, 0);
    }
}




class Delivery {
  constructor(mealId,neighborhoodId,customerId){
    this.neighborhoodId = neighborhoodId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.id = ++deliveryId

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(
        function(meal) {
            return meal.id === this.mealId;
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

  customer() {
    return store.customers.find(
        function(customer) {
            return customer.id === this.customerId;
        }.bind(this)
    );
  }
}
