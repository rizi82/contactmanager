import React, {Component} from 'react';
import Contact from './Contact';
import {Consumer} from '../../context';

class Contacts extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const {contacts} = value;
                    return (
                        <React.Fragment>
                            <h2 className="mb4 display-4">
                                <span className="text-danger mr-1">
                                    Contact
                                </span>
                                List
                            </h2>
                            {contacts.map(contact => (<Contact
                                key={contact.id}
                                contact={contact}
                                onDeleteHandler={this.deleteContact}/>))}
                        </React.Fragment>
                    );
                }}
            </Consumer>
        )

    }
}

export default Contacts;