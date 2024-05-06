import React from 'react';
import AddContactForm from './addContactForm/addContactForm';
import ContactList from './contactList/contactList';
import Filter from './filter/filter';
import { Component } from 'react';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  setContacts = () => {
    const { filter } = this.state;

    this.setState({
      filter,
      contacts: JSON.parse(localStorage.getItem('contacts')),
    });
  };

  setContactToStorage = newContact => {
    const { contacts } = this.state;
    if (
      contacts.some(contact => {
        return (
          contact.name.toLowerCase() === newContact.name.trim().toLowerCase()
        );
      })
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContact])
      );
      this.setContacts();
    }
  };

  handleChange = e => {
    const { contacts } = this.state;

    this.setState({
      [e.target.name]: e.target.value,
      contacts,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.length
      ? contacts.filter(contact => {
          return contact.name.toLowerCase().includes(filter.toLowerCase());
        })
      : contacts;
  };

  deleteContact = deletedId => {
    const { contacts } = this.state;

    const filteredContacts = contacts.filter(({ id }) => deletedId !== id);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    this.setContacts();
  };

  componentDidMount() {
    this.setContacts();
  }

  render() {
    const {
      setContactToStorage,
      handleChange,
      getFilteredContacts,
      deleteContact,
      state,
    } = this;
    const { contacts, filter } = state;
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
  }
}

export default App;
