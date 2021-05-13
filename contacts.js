const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db", "contacts.json");

const updateContacts = (contacts) => {
  const data = JSON.stringify(contacts);
  fs.writeFile(contactsPath, data);
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    error.message = "Can not read file";
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    return newContacts;
  } catch (error) {
    throw error;
  }
}

async function addContact(newContact) {
  try {
    const contacts = await listContacts();

    newContact.id = v4();

    contacts.push(newContact);

    updateContacts(contacts);

    return contacts;
  } catch (error) {
    throw error;
  }
}

async function updateContact(contactId, updateContact) {
  try {
    const contacts = await listContacts();
    let contact = contacts.findIndex(({ id }) => id === contactId);
    contact = { ...updateContact, id: contactId };
    updateContacts(contact);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
