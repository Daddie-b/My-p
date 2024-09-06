const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as needed

mongoose.connect('mongodb+srv://wahome:Babylast123@mydatabase.fzql9.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const admin = new User({
      username: 'admin',
      email: 'billwahomebill@gmail.com',
      password: 'Babylast', 
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
