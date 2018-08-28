import React, {Component} from 'react';
import axios from 'axios';
// create a context for the porvider and consumer
const Context = React.createContext();

// create a reducer for the action
const reducer = (state, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state
                    .contacts
                    .filter(contact => contact.id !== action.payload)
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [
                    action.payload, ...state.contacts
                ]
            }
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state
                    .contacts
                    .map(contact => contact.id === action.payload.id
                        ? (contact = action.payload)
                        : contact)
            }
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        contacts: [],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }
    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({contacts: res.data});
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }

}

export const Consumer = Context.Consumer;