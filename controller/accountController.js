// Assuming you have the Customer model imported and available
import Customer from '../models/customerModel.js';
import Account from '../models/accountModel.js';


async function getCustomerId(uName) {
  try {
    // Find the customer based on the identifier
    let customer;
    customer = await Customer.findOne({ username: uName });
    // Check if the customer exists
    if (!customer) {
      throw new Error('Customer not found');
    }
    // Return the customer's ObjectId
    return customer._id;
  } catch (error) {
    throw new Error('Failed to get customer ID: ' + error.message);
  }
}

export async function addAccount(req, res) {
  try {
    const customerId = await getCustomerId(req.body.username);
    if (!customerId) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const account = new Account({
      account_type: req.body.account_type,
      account_number: req.body.account_number, // Example account number
      customer: customerId, // Replace "customerId" with the ObjectId of the customer
      balance: req.body.balance, // Example initial balance
    });

    // Save the account to the database
    const savedAccount = await account.save();
    console.log('Account created:', savedAccount);
    // Send a success response
    res.status(200).json({ message: 'Account created successfully', account: savedAccount });
  } catch (error) {
    // Error occurred while saving the account
    console.error('Error creating account:', error);
    // Send an error response
    res.status(500).json({ error: 'An error occurred while creating the account' });
  }
}


