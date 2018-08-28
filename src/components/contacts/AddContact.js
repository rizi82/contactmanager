import React, {Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onChangeEvent = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onFormSubmit = async(dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        if (name === '') {
            this.setState({
                errors: {
                    name: 'Name is required'
                }
            });
            return;
        }

        if (email === '') {
            this.setState({
                errors: {
                    email: 'Email is required'
                }
            });
            return;
        }

        if (phone === '') {
            this.setState({
                errors: {
                    phone: 'Phone is required'
                }
            });
            return;
        }

        const contact = {
            name,
            email,
            phone
        }
        const res = await axios.post('https://jsonplaceholder.typicode.com/users', contact);

        dispatch({type: 'ADD_CONTACT', payload: res.data});

        // reset the state
        this.setState({name: '', email: '', phone: '', errros: {}})

        this
            .props
            .history
            .push('/');
    }
    render() {
        const {name, email, phone, errors} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div >
                            <div className="card card-header mb3">
                                <h2>Add Contact</h2>
                            </div>
                            <div className="card card-body">
                                <form
                                    onSubmit={this
                                    .onFormSubmit
                                    .bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter Name.."
                                        value={name}
                                        onChange={this.onChangeEvent}
                                        error={errors.name}/>
                                    <TextInputGroup
                                        label="Email"
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email.."
                                        value={email}
                                        onChange={this.onChangeEvent}
                                        error={errors.email}/>
                                    <TextInputGroup
                                        label="Phone"
                                        className="form-control"
                                        name="phone"
                                        placeholder="Enter Phone.."
                                        value={phone}
                                        onChange={this.onChangeEvent}
                                        error={errors.phone}/>
                                    <div className="form-group">
                                        <button className="btn btn-block btn-secondary">Add New</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        )

    }
}

export default AddContact;
