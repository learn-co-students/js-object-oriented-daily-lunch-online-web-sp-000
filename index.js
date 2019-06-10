// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

// new Neighborhood() - initialized with name. It returns an object that has attributes of id and name
// deliveries() - returns a list of all deliveries placed in a neighborhood
// customers() - returns all of the customers that live in a particular neighborhood
// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
        store.neighborhoods.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId === this.id;
      });
    }

    customers() {
      return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id;
      });
    }

    meals() {
      const neighborhoodMeals = this.deliveries().map(delivery => delivery.meal() );
      return [...new Set(neighborhoodMeals)];
    }
}

// new Customer() — should expect to be initialized with a name and a neighborhoodId. It returns an object that has attributes of id, neighborhoodId, and name.
// deliveries() — returns all of the deliveries that customer has received
// meals() - returns all meals that a customer has ordered
// totalSpent() - returns the total amount that the customer has spent on food.

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId
        store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
      });
    }

    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent() {
      return this.meals().reduce((total, meal) => (total += meal.price), 0);
}


}

// new Meal() — initialized with title and price. It returns an object that has attributes of title, price, and id. Meal Ids should automatically increment.
// deliveries() - returns all of the deliveries associated with a particular meal.
// customers() - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
// byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.


class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

        store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id;
      });
    }

    customers() {
       return this.deliveries().map(delivery => delivery.customer());
    }

    static byPrice() {
    return store.meals.sort((a, b) => (b.price - a.price));
  }

}

// new Delivery() — initialized with mealId, neighborhoodId, and customerId. It returns an object that has attributes of mealId, neighborhoodId, customerId, and id
// meal() - returns the meal associated with a particular delivery
// customer() - returns the customer associated with a particular delivery
// neighborhood() - returns the neighborhood associated with a particular delivery


class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.neighborhoodId = neighborhoodId
    this.mealId = mealId
    this.customerId = customerId

        store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => {
      return meal.id === this.mealId;
      });
    }

    customer() {
      return store.customers.find(customer => {
      return customer.id === this.customerId;
      });
    }

    neighborhood() {
      return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
      });
    }
}
