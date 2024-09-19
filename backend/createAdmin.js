const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const User = require('./models/User'); // Adjust path as needed

mongoose.connect('mongodb+srv://wahome:Babylast123@mydatabase.fzql9.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'billwahomebill@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return process.exit();
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash('Babylast', 10);

    const admin = new User({
      username: 'admin',
      email: 'billwahomebill@gmail.com',
      password: hashedPassword, // Store the hashed password
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
