// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodID = 0;
let mealID = 0;
let customerID = 0;
let deliveryID = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodID;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    );
  }

  customers() {
    const customerArray = [];
    this.deliveries().forEach(function(delivery) {
      if (customerArray.length === 0) {
        customerArray.push(delivery.customer());
      } else {
        for (let i = 0; i < customerArray.length; i++) {
          if (customerArray[i] === delivery.customer()) {
          } else {
            customerArray.push(delivery.customer());
          }
        }
      }
    });
    return customerArray;
  }

  meals() {
    const mealArray = [];
    let flag = false;
    this.deliveries().forEach(function(delivery) {
      if (mealArray.length === 0) {
        mealArray.push(delivery.meal());
      } else {
        flag = false;
        for (let i = 0; i < mealArray.length; i++) {
          if (mealArray[i] === delivery.meal()) {
            flag = true;
          }
        }
        if (flag){}
        else {mealArray.push(delivery.meal());}
      }
    });
    return mealArray;
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerID;
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }

  meals() {
    const mealArray = [];
    this.deliveries().forEach(function(delivery) {
      mealArray.push(delivery.meal());
    });
    return mealArray;
  }

  totalSpent(){
    let total = 0; 
    this.meals().forEach(function(meal){
      total += meal.price;
    });
    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealID;
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
    const customerArray = [];
    this.deliveries().forEach(function(delivery) {
      customerArray.push(delivery.customer());
    });
    return customerArray;
  }

  static byPrice() {
    const sortedMeals = [...store.meals];
    return sortedMeals.sort(function(meal1, meal2){
      return meal2.price - meal1.price;
    });
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryID;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
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
