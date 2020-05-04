import * as faker from 'faker';

// generate array of objects of fake data
let employeeList = [];

for (let i = 0; i < 35; i++) {
  // generate random info for
  // name
  // department
  // city
  // imageUrl
  employeeList.push({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    department: faker.commerce.department(),
    city: faker.address.city(),
    imageUrl: faker.image.avatar(),
  });
}

export default employeeList;
