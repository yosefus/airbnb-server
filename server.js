import { faker } from '@faker-js/faker';
import express from 'express'
import { hotelImages } from './data.js';

const app = express();
const port = 3003;

const generateListing = () => ({
  id: faker.database.mongodbObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(2),
  images: Array.from({ length: 3 }, () => hotelImages[Math.floor(Math.random() * hotelImages.length)]),
  location: {
    city: faker.location.city(),
    country: faker.location.country(),
    latitude: parseFloat(faker.location.latitude()),
    longitude: parseFloat(faker.location.longitude()),
  },
  price_per_night: faker.commerce.price({ min: 100, max: 1000, symbol: '$' , dec: 8}),
  rating: faker.number.float({ multipleOf: 0.1, max: 5 }),
  amenities: faker.helpers.arrayElements(
    ['Wi-Fi', 'Kitchen', 'Parking', 'Washer', 'Air Conditioning', 'Pool', 'Gym', 'Pet Friendly'],
    faker.number.int({ min: 2, max: 5 })
  ),
  host: {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    is_superhost: faker.datatype.boolean(),
  },
  reviews_count: faker.number.int({ min: 0, max: 500 }),
  property_type: faker.helpers.arrayElement(['Apartment', 'House', 'Condo', 'Loft', 'Townhouse']),
  beds: faker.number.int({ min: 1, max: 5 }),
  baths: faker.number.int({ min: 1, max: 3 }),
  max_guests: faker.number.int({ min: 1, max: 10 }),
  check_in_time: faker.date.recent(),
  check_out_time: faker.date.recent(),
});

const generateListings = (count = 10) =>
  Array.from({ length: count }, () => generateListing());

app.get('/api/listings', (req, res) => {
  const listings = generateListings();
  res.json(listings);
});

app.get('/api/listings/:id', (req, res) => {
  const listing = generateListing();
  res.json(listing);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// http://localhost:3003/api/listings
// http://localhost:3003/api/listings/3434