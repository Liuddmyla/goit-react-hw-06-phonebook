import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts';
import css from './ContactList.module.css';


const ContactList = ({ children }) => {
  const filtersContacts = (contacts, filter) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const contactsList = filtersContacts(contacts, filter);

  const deleteItem = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <div >
        <h2 className={css.title}>Contacts</h2>
        {children}
        <ul className={css.list}>
          {contactsList.map(({ name, number, id }) => (
            <li key={id} className={css.item}>
              <p>{name}: {number} </p>
              <button type="button" onClick={() => deleteItem(id)} className={css['btn-delete']}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;