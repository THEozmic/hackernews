import React, { Component } from 'react';
import './App.css';

const messages =
[
  {
    username: '@theozmic',
    message: 'Hello guys',
    priority: 'critical',
    readBy: '@charles, @obi, @esther',
    objectID: 0
  },
  {
    username: '@charles',
    message: 'Yo! pipo',
    priority: 'normal',
    readBy: '@theozmic, @obi, @esther',
    objectID: 1
  }
];

const isSearched = (searchTerm) => (item) => {
  return !searchTerm || item.username.toLowerCase().includes(searchTerm.toLowerCase())
  || item.message.toLowerCase().includes(searchTerm.toLowerCase())
  || item.priority.toLowerCase().includes(searchTerm.toLowerCase());
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages,
      searchTerm: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value.trim() });
  };

  onDelete(itemID) {
    const messages = this.state.messages.filter((item) => {
      return item.objectID !== itemID;
    });
    this.setState({ messages });
  };

  render() {
    const { messages, searchTerm } = this.state;
    return (
      <div>
        <Search searchTerm={ searchTerm } onChange={ this.onSearchChange }>Search</Search>
        <Messages messages={ messages } searchTerm={ searchTerm } onDelete={ this.onDelete}/>
      </div>
    );
  };
}

const Search = ({ searchTerm, onChange, children }) =>
<div>
  {children} <input type="text" value={ searchTerm } onChange={ onChange }/>
</div>

const Messages = ({ messages, searchTerm, onDelete }) =>
<div>
  { messages.filter(isSearched(searchTerm)).map(item =>
      <div key={ item.objectID.toString() }>
        <hr/>
        <div className='username'>{ item.username }
          <span className='priority'> -{ item.priority }</span>
        </div>
        <div className='message'> { item.message} </div>
        <div className='read-by'> { item.readBy } </div>
        <Button className='danger' onClick={() => onDelete(item.objectID) }>Delete</Button>
      </div>
    )
  }
</div>

const Button = ({ className = '', onClick, children }) =>
<button onClick={ onClick } type='button' className={ className }>
  { children }
</button>

export default App;