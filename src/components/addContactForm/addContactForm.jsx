import { useState } from 'react';
import styles from './addContactForm.module.css';
import { nanoid } from 'nanoid';

const AddContactForm = ({ contacts, setContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (name === '') return;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      setContacts(newContact);
    }

    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={({ target }) => setName(target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={styles.label} htmlFor="number">
        Number
      </label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={({ target }) => setNumber(target.value)}
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
