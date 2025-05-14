const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User'); // Adjust path if necessary

describe('User Model Validations', () => {
  it('should create a valid user', async () => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com'
    };
    const user = new User(userData);
    try {
      await user.validate();
    } catch (error) {
      // This block should not be reached for a valid user
      expect.fail('Validation failed for a valid user');
    }
  });

  it('should require firstName, lastName, and email', async () => {
    const user = new User({});
    try {
      await user.validate();
      expect.fail('Validation should have failed for missing fields');
    } catch (error) {
      expect(error.errors.firstName).to.exist;
      expect(error.errors.lastName).to.exist;
      expect(error.errors.email).to.exist;
    }
  });

  it('should reject firstName if it contains non-alphabetic characters', async () => {
    const user = new User({ firstName: 'Test1', lastName: 'User', email: 'test@example.com' });
    try {
      await user.validate();
      expect.fail('Validation should have failed for non-alphabetic firstName');
    } catch (error) {
      expect(error.errors.firstName).to.exist;
      expect(error.errors.firstName.message).to.equal('First name must contain only alphabetical characters');
    }
  });

  it('should reject firstName if it exceeds 100 characters', async () => {
    const longName = 'a'.repeat(101);
    const user = new User({ firstName: longName, lastName: 'User', email: 'test@example.com' });
    try {
      await user.validate();
      expect.fail('Validation should have failed for too long firstName');
    } catch (error) {
      expect(error.errors.firstName).to.exist;
      // Mongoose default maxlength message might be generic, or specific if you set one.
      // For now, we just check the error exists.
    }
  });

  it('should reject lastName if it contains non-alphabetic characters', async () => {
    const user = new User({ firstName: 'Test', lastName: 'User1', email: 'test@example.com' });
    try {
      await user.validate();
      expect.fail('Validation should have failed for non-alphabetic lastName');
    } catch (error) {
      expect(error.errors.lastName).to.exist;
      expect(error.errors.lastName.message).to.equal('Last name must contain only alphabetical characters');
    }
  });

  it('should reject lastName if it exceeds 100 characters', async () => {
    const longName = 'a'.repeat(101);
    const user = new User({ firstName: 'Test', lastName: longName, email: 'test@example.com' });
    try {
      await user.validate();
      expect.fail('Validation should have failed for too long lastName');
    } catch (error) {
      expect(error.errors.lastName).to.exist;
    }
  });

  it('should reject an invalid email address', async () => {
    const user = new User({ firstName: 'Test', lastName: 'User', email: 'invalid-email' });
    try {
      await user.validate();
      expect.fail('Validation should have failed for invalid email');
    } catch (error) {
      expect(error.errors.email).to.exist;
      expect(error.errors.email.message).to.equal('Please fill a valid email address');
    }
  });
}); 