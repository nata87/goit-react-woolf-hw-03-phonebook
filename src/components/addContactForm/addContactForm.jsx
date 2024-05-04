import { Component } from 'react';
import styles from './addContactForm.module.css';
import { nanoid } from 'nanoid';

class AddContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  setName(name) {
    this.setState(prev => {
      return {
        ...prev,
        name: name,
      };
    });
  }
  setNumber(number) {
    this.setState(prev => {
      return {
        ...prev,
        number: number,
      };
    });
  }

  handleSubmit = e => {
    const { name, number } = this.state;
    const { setContacts } = this.props;

    e.preventDefault();
    if (name === '') return;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(newContact);

    this.setName('');
    this.setNumber('');
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={({ target }) => this.setName(target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={styles.label} htmlFor="number">
          Number
        </label>
        <input
          id="number"
          type="tel"
          name="number"
          value={number}
          onChange={({ target }) => this.setNumber(target.value)}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

export default AddContactForm;
