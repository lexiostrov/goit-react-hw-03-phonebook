import PropTypes from 'prop-types';
import { Btn } from './ContactList.styled';

export const ContactsList = ({ contacts, onClickDelBtn }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <p>{name}:</p>
            <p>{number}</p>
            <Btn onClick={() => onClickDelBtn(id)} type="button">
              Delete contact
            </Btn>
          </li>
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  onClickDelBtn: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
};
