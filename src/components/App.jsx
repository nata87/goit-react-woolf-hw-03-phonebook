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
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    });
  };

  handleChange = e => {
    this.setState({
      filter: e.target.value,
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
    this.setState({ contacts: filteredContacts });
  };

  addContact = newContact => {
    this.setState(prev => {
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  componentDidMount() {
    this.setContacts();
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const { handleChange, getFilteredContacts, deleteContact, state } = this;
    const { contacts, filter } = state;

    return (
      <div>
        <h1>Phonebook</h1>
        <AddContactForm setContacts={this.addContact} contacts={contacts} />
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
