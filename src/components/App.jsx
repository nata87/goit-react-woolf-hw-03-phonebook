import React, { useState } from 'react';
import AddContactForm from './addContactForm/addContactForm';
import ContactList from './contactList/contactList';
import Filter from './filter/filter';

const App = () => {
  const localStorageData = localStorage.getItem('contacts');
  const [state, setState] = useState({
    contacts: localStorageData ? JSON.parse(localStorageData) : [],
    filter: '',
  });

  const { contacts, filter } = state;
  const setContacts = () => {
    const localStorageData = localStorage.getItem('contacts');
    setState({
      filter,
      contacts: JSON.parse(localStorageData),
    });
  };

  const setContactToStorage = contact => {
    // додоаємо контакт до локального сховища
    localStorage.setItem('contacts', JSON.stringify([...contacts, contact]));
    // зміна стану (тригер ререндерингу)
    setContacts();
  };

  const handleChange = e => {
    setState({
      [e.target.name]: e.target.value,
      contacts,
    });
  };

  const getFilteredContacts = () => {
    return contacts.length
      ? contacts.filter(contact => {
          return contact.name.toLowerCase().includes(filter.toLowerCase());
        })
      : contacts;
  };

  const deleteContact = deletedId => {
    const filteredContacts = contacts.filter(({ id }) => deletedId !== id);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    setContacts();
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <AddContactForm setContacts={setContactToStorage} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
