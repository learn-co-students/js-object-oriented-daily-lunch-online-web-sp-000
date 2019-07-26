// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let initNeighborhoodId = 0;
let initMealId = 0;
let initCustomerId = 0;
let initDeliveryId = 0;

class Neighborhood {
    constructor(name){
        this.name = name;
        this.id = ++initNeighborhoodId;
        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter(function(del) {
            return del.neighborhoodId === this.id;
        }.bind(this))

    }

    customers() {
        return store.customers.filter(function(cust) {
            return cust.neighborhoodId === this.id;
        }.bind(this))

    }

    meals() {
        const array = this.deliveries().map(function(del) {
            return del.meal();
        }.bind(this))

        const distinctMeals = [...new Set(array.map(x => x.title))];
        return distinctMeals;
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++initDeliveryId;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find(function(meal) {
            return meal.id === this.mealId;
        }.bind(this));
    }

    customer() {
        return store.customers.find(function(cust) {
            return cust.id === this.customerId;
        }.bind(this));
    }

    neighborhood() {
        return store.neighborhoods.find(function(nei) {
            return nei.id === this.neighborhoodId;
        }.bind(this));
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.name = name;
        this.id = ++initCustomerId;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(function(del) {
            return del.customerId === this.id;
        }.bind(this));
    }

    meals() {
        return this.deliveries().map(function(del) {
            return del.meal();
        })
    }

    totalSpent() {
        return this.meals().reduce(function(total, meal){
            return total + meal.price;
        }, 0)
    }
}


class Meal {
    static byPrice() {
        return store.meals.sort(function(a,b) {
            return b.price - a.price;
        })
        // return store.meals.sort((a,b) => (a.price < b.price) ? 1: -1)
    }

    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.id = ++initMealId;
        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(function(del) {
            return del.mealId === this.id;
        }.bind(this));
    }

    customers() {
        return this.deliveries().map(function(del) {
            return del.customer();
        });
    }


}


