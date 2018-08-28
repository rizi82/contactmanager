// uncontroll and with ref
import React, {Component} from 'react';
class AddContact extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    static defaultProps = {
        name: 'Rizi ',
        email: 'rizi@gmail.com',
        phone: '1232-333-333'
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const contact = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
        }
        console.log(contact);
    }
    render() {
        const {name, email, phone} = this.props;
        return (
            <div>
                <div className="card card-header mb3">
                    <h2>Add Contact</h2>
                </div>
                <div className="card card-body">
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name</label>
                            <input
                                type="input"
                                className="form-control"
                                name="name"
                                placeholder="Enter Name.."
                                defaultValue={name}
                                ref={this.nameInput}/></div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email.."
                                defaultValue={email}
                                ref={this.emailInput}/></div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="phone"
                                className="form-control"
                                name="phone"
                                placeholder="Enter Phone.."
                                defaultValue={phone}
                                ref={this.phoneInput}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-block btn-secondary">Add New</button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default AddContact;
