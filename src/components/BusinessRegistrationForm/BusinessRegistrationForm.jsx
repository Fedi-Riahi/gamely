"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const BusinessRegistrationForm = () => {

  const { data: session } = useSession() 
  const [formData, setFormData] = useState({
    userId: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    contactEmail: '',
    businessEntityType: 'individual',
    businessName: '',
    registrationNumber: '',
    taxNumber: ''
  });
  const [sellerUserId, setSellerUserId] = useState('');

  useEffect(() => {
    // Fetch user data from API
    fetch('/api/user')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        // Find user with matching email to session user's email
        const sessionUserEmail = session?.user?.email
        const foundUser = data.users.find(user => user.email === sessionUserEmail);
        if (foundUser) {
          setSellerUserId(foundUser._id);
          sessionStorage.setItem('sellerUserId', foundUser._id);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sessionUserEmail = session?.user?.email;
      if (!sessionUserEmail) {
        throw new Error('Session user email not found');
      }
  
      // Fetch user data from API
      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
  
      // Find user with matching email
      const foundUser = data.users.find(user => user.email === sessionUserEmail);
      if (!foundUser) {
        throw new Error('User not found');
      }
  
      // Set sellerUserId in session storage
      const sellerUserId = foundUser._id;
      sessionStorage.setItem('sellerUserId', sellerUserId);
      setFormData(prevState => ({ ...prevState, userId: sellerUserId }));
  
      // Continue with form submission
      const formDataWithUserId = { ...formData, userId: sellerUserId };
      const submissionResponse = await fetch('/api/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithUserId)
      });
  
      if (!submissionResponse.ok) {
        throw new Error('Failed to register as a seller');
      }
  
      const responseData = await submissionResponse.json();
      console.log('Seller registered successfully:', responseData.seller);
      // Handle success, maybe redirect to a dashboard or display a success message
      // Reset the form data
      setFormData({
        userId: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        contactEmail: '',
        businessEntityType: 'individual',
        businessName: '',
        registrationNumber: '',
        taxNumber: ''
      });
    } catch (error) {
      console.error('Error registering as a seller:', error);
      // Handle error, maybe display an error message to the user
    }
  };
  
  

  return (
    <div className='mt-20'>
      <h1>Business Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="userId" value={formData.userId} />
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="contactEmail">Contact Email:</label>
          <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="businessEntityType">Business Entity Type:</label>
          <select id="businessEntityType" name="businessEntityType" value={formData.businessEntityType} onChange={handleChange}>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </select>
        </div>
        {formData.businessEntityType === 'company' && (
          <div>
            <label htmlFor="businessName">Company Name:</label>
            <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required />
          </div>
        )}
        {formData.businessEntityType === 'company' && (
          <div>
            <label htmlFor="registrationNumber">Registration Number:</label>
            <input type="text" id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
          </div>
        )}
        {formData.businessEntityType === 'company' && (
          <div>
            <label htmlFor="taxNumber">Tax Number:</label>
            <input type="text" id="taxNumber" name="taxNumber" value={formData.taxNumber} onChange={handleChange} required />
          </div>
        )}
        <button type="submit">Register as Seller</button>
      </form>
    </div>
  );
};

export default BusinessRegistrationForm;
