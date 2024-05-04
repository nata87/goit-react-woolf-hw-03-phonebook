import { Component } from 'react';
import styles from '../addContactForm/addContactForm.module.css';

class Filter extends Component {
  render() {
    const { filter, handleChange } = this.props;

    return (
      <>
        <label
          style={{ marginLeft: '20px' }}
          className={styles.label}
          htmlFor="filter"
        >
          Find contacts by name
        </label>
        <input
          style={{ marginLeft: '20px' }}
          id="filter"
          name="filter"
          value={filter}
          onChange={handleChange}
        />
      </>
    );
  }
}

export default Filter;
