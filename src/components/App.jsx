import React, { Component } from 'react';
import { AddContact } from './AddContact/AddContact';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    this.loadContactsFromLocalStorage();
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.saveContactsToLocalStorage();
    }
  }

  loadContactsFromLocalStorage() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  saveContactsToLocalStorage() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  dataHandleSubmit = data => this.addContactMarckup(data);

  addContactMarckup = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert('This contact already exists')
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const lowCaseFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  onClickDelBtn = currentID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== currentID),
    }));
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.dataHandleSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilter={this.onFilterChange} />
        <ContactsList
          onClickDelBtn={this.onClickDelBtn}
          contacts={this.visibleContacts()}
        />
      </Container>
    );
  }
}
