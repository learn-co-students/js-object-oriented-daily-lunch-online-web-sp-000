// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIds = 1

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodIds++

    store.neighborhoods.push(this)
  }


  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  deliveries() {
    console.log(store.deliveries)
    console.log(this)
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    // return store.deliveries.filter(function(delivery) { return delivery.neighborhoodId === this.id}.bind(this))
  }

  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}

let mealIds = 1

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealIds++

    store.meals.push(this)
  }

  deliveries () {
    return store.deliveries.filter(
      function(delivery){
        return delivery.mealId === this.id
      }.bind(this)
    )
  }

  customers () {
    return this.deliveries().map( delivery => {
        return delivery.customer()
      }
    )
  }

  static byPrice () {
    return store.meals.sort(function (a, b) { return b.price - a.price })
  }
}

let customerIds = 1

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = customerIds++
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0)
  }
}

let deliveryIds = 1

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    this.id = deliveryIds++

    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}


