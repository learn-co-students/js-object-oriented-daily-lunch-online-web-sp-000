// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }
  // deliveries(){
  //   return store.deliveries.filter(
  //     function(delivery) {
  //       delivery.neighborhoodId === this.id;
  //     })
  // }
  deliveries() {
      return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
   } 

   customers(){
     return store.customers.filter(customer => customer.neighborhoodId === this.id);
    }
    meals(){
      let mealArr = this.deliveries().map(function(delivery){
        return delivery.meal();
      });
      return [...new Set(mealArr)];
    }
}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.mealId === this.id;
        }.bind(this)
    );
  }
   meals(){
     return this.deliveries().map(function(delivery){
       return delivery.meal();
     });
   }
   customers(){
     return this.deliveries().map(function(delivery){
       return delivery.customer();
     });
   }
    static byPrice(){
      return store.meals.sort(function(a, b){
        return b.price - a.price;
      });
   }
}

class Delivery{
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId;
    this.mealId = meal;
    this.customerId = customer;
    this.neighborhoodId = neighborhood;
    store.deliveries.push(this)
  }

 // constructor(mealId, neighborhoodId, customerId) {
 //    this.id = ++deliveryId;
 //    this.mealId = mealId;
 //    this.neighborhoodId = neighborhoodId;
 //    this.customerId = customerId;
 //    store.deliveries.push(this);
 //  } 

  meal(){
    return store.meals.find(
         function(meal) {
             return meal.id === this.mealId;
         }.bind(this)
     );
  }
  customer(){
    return store.customers.find(
         function(customer) {
             return customer.id === this.customerId;
         }.bind(this)
     );
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighorhoodId);

  }
}

class Customer{
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.neighborhoodId = neighborhood;
    this.name = name;
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.customerId === this.id;
        }.bind(this)
    );
  }
  meals(){
     return this.deliveries().map(function(delivery){
       return delivery.meal();
     });
  }
  totalSpent() {
    var total = this.meals().reduce(function(tot, mealObj) {
      return tot + mealObj.price;
   },0);
      return total;
  }
}
