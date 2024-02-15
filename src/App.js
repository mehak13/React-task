import React, { useState } from 'react';

const ContactManagementSystem = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const addContact = () => {
    if (formData.name && isValidEmail(formData.email) && formData.phone) {
      setContacts([...contacts, formData]);
      setFormData({ name: '', email: '', phone: '' });
    }
  };

  const updateContact = (index) => {
    if (formData.name && isValidEmail(formData.email) && formData.phone) {
      const updatedContacts = [...contacts];
      updatedContacts[index] = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      setContacts(updatedContacts);
      setFormData((prevFormData) => ({ ...prevFormData, name: '', email: '', phone: '' }));
    }
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const searchContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h1>Contact Management System</h1>

      {/* Add Contact Form */}
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
        <button type="button" onClick={addContact}>
          Save Contact
        </button>
      </form>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Contact List */}
      <ul>
        {searchContacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => updateContact(index)}>Update</button>
            <button onClick={() => deleteContact(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactManagementSystem;
