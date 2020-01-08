// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


const Neighborhood = (() => {
  let neighborhoodIds = 1
   return class {
      constructor(name) {
      this.name = name;
      this.id = neighborhoodIds++;
      store.neighborhoods.push(this);
      }
      deliveries() {
        return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
      }

      customers(){
        return store.customers.filter(customer => customer.neighborhoodId === this.id)
      }

      meals() {
        const allMeals = this.customers().map(customer => customer.meals());
        const merged = [].concat.apply([], allMeals);
        return [...new Set(merged)];
      }

   };
})();

const Customer = (() =>{
  let customerIds = 1;
  return class {
    constructor(name, neighborhoodId) {
      this.name = name;
      this.id = customerIds++;
      this.neighborhoodId = neighborhoodId;
      store.customers.push(this);
    }
    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }

    meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }

    totalSpent() {
       return this.meals().reduce((total, meal) => (total += meal.price), 0)
    }
  };
})();

const Meal = (() => {
  let mealIds = 1;
  return class {
    constructor(title, price){
      this.title = title;
      this.price = price;
      this.id = mealIds++;
      store.meals.push(this)
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id)
    }

    customers() {
      return this.deliveries().map(delivery => delivery.customer())
    }

    static byPrice() {
        return store.meals.sort(function(a, b) {
           return parseFloat(b.price) - parseFloat(a.price);
         });
      }
  };
})();

const Delivery = (() => {
  let deliveryIds = 1;
  return class {
    constructor(mealId, neighborhoodId, customerId) {
      this.id = deliveryIds++;
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => meal.id === this.mealId);
    }

    neighborhood() {
      return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
    }

    customer(){
      return store.customers.find(customer => customer.id === this.customerId)
    }
  };
})();
