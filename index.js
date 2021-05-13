const contacts = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const list = await contacts.listContacts();
        console.table(list);
        break;

      case "get":
        const contact = await contacts.getContactById(id);
        console.table(contact);
        break;

      case "add":
        const addContact = await contacts.addContact({ name, email, phone });

        console.table(addContact);
        break;

      case "remove":
        const removeContact = await contacts.removeContact(id);
        console.table(removeContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    throw err;
  }
}

invokeAction(argv);
