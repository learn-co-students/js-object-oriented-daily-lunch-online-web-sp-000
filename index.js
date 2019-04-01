let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};

let neighborhoodIds = 0;
let mealIds = 0;
let customerIds = 0;
let deliveryIds = 0;


class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = neighborhoodIds++;
    store.neighborhoods.push(this);
  };
  customers() {
    return store.customers.filter( customer => {
      return customer.neighborhoodId === this.id);
    });
  }
  
}
