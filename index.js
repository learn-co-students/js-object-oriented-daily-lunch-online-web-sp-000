// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId =0;
class Neighborhood {
    constructor(name) {
        this.name = name;
        this.id = ++neighborhoodId;

        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
    }

    customers() {
        return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }

    meals() {
        let customers = [];
        let meals = this.deliveries().map(delivery=> delivery.meal());
            meals.forEach(meal=> {
                if(!customers.includes(meal)) {
                    customers.push(meal);
                }
            })
            return customers;
    }
}

let customerId = 0;
class Customer {
    constructor(name, neighborhoodId) {
        this.name = name;
        this.id = ++customerId;
        if (neighborhoodId) {
            this.neighborhoodId = neighborhoodId;
        }
        
        store.customers.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
       return this.deliveries().map(delivery => delivery.meal());
      }

    totalSpent() {
        return this.meals().map(meal => (meal.price)).reduce((a, b) => a + b);
    }
}

let mealId = 0;
class Meal {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.id = ++mealId;

        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
        let meals = [];
        let customers= this.deliveries().map(delivery=> delivery.customer());
            customers.forEach(customer => {
                if(!meals.includes(customer)) {
                    meals.push(customer);
                }
            })
        return meals;
    }   
    static byPrice() {
        return store.meals.sort((x, y) => (y.price - x.price));
    }     
} 
      
let deliveryId = 0;
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id =++deliveryId;
        if(mealId){
            this.mealId = mealId;
        }
        if(neighborhoodId){
            this.neighborhoodId = neighborhoodId;
        }
        if(customerId){
            this.customerId = customerId;
        }

        store.deliveries.push(this);
    }

    meal() {
        return store.meals.find(meal => this.mealId === meal.id);
    }

    customer() {
        return store.customers.find(customer => this.customerId === customer.id);
    }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => this.neighborhoodId ===neighborhood.id)
    }

}