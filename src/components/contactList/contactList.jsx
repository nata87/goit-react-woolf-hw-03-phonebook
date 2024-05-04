import { Component } from 'react';

class ContactList extends Component {
  render() {
    const { contacts, deleteContact } = this.props;
    return (
      <ul>
        {contacts.map(({ name, number, id }) => (
          <li key={id}>
            {name}: {number}
            <button
              style={{ marginLeft: '20px' }}
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;
