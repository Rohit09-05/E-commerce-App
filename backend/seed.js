const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Order = require('./models/Order');

const sampleProducts = [
  {
    name: 'Sample Product 1',
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Description for sample product 1',
    price: 199.99,
  },
  {
    name: 'Sample Product 2',
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Description for sample product 2',
    price: 299.99,
  },
  {
    name: 'Sample Product 3',
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Description for sample product 3',
    price: 399.99,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Remove existing data
    await Product.deleteMany();
    await Order.deleteMany();

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);

    // Optionally, create some test orders referencing the sample products
    await Order.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      product_id: createdProducts[0]._id,
      product_name: createdProducts[0].name,
      comments: 'I am interested',
      fulfilled: false,
    });

    console.log('Sample data inserted!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
