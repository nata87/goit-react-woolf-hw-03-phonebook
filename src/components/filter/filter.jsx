import styles from '../addContactForm/addContactForm.module.css';

const Filter = ({ filter, handleChange }) => {
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
};

export default Filter;
