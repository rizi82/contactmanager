import React, {Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }
    async componentDidMount() {
        const {id} = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({name: contact.name, email: contact.email, phone: contact.phone});
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

        const {id} = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, contact);

        dispatch({type: 'UPDATE_CONTACT', payload: res.data});
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
                                <h2>Edit Contact</h2>
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
                                        <button className="btn btn-block btn-secondary">Update Contact</button>
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

export default EditContact;
