import React, { useState, useEffect } from 'react';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const saveContact = () => {
    if (!name || !surname || !phone) {
      setErrorMessage('Заполните все поля формы');
      return;
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      username: surname,
      phone,
    };
    setContacts([...contacts, newContact]);
    setShowForm(false);
    setName('');
    setSurname('');
    setPhone('');
    setErrorMessage('');
  };

  return (
    <div>
      <h1>Контакты</h1>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.username}</td>
              <td>{contact.phone}</td>
              <td>
                <button className='btnDelete' onClick={() => deleteContact(contact.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm ? (
        <div>
          <h2>Форма добавление контакта</h2>
          <form>
            <div>
              <label>Имя:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Фамилия:</label>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <div>
              <label>Телефон:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            {errorMessage &&errorMessage.length > 0 && (
              <p>{errorMessage}</p>
            )}
            <button className='btnSave' type="button" onClick={saveContact}>Сохранить</button>
            <button className='btnCancel' type="button" onClick={() => setShowForm(false)}>Отменить</button>
          </form>
        </div>
      ) : (
        <button className='btnAdd' onClick={() => setShowForm(true)}>Додати контакт</button>
      )}
    </div>
  );
};

export default Contacts;