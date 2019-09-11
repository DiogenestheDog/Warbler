import React from 'react';
import { Link } from 'react';


class SessionForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    update(type) {
        return e => this.setState({
            [type]: e.currentTarget.value
        });
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors ? this.props.errors.map(error => (
                    <li>error</li>
                    )
                ) : ""}
            </ul>
        )
    }

    askForUsername() {
        return (
            <label>Username
                <input type="text"
                    value={this.state.username}
                    onChange={this.update('username')}         
                />
            </label>
        );
    }

    render() {
        const { formType, errors } = this.props;
        return (
        <div>
            <h1>I hope to be a rainbow someday</h1>
            <h2>{formType}!</h2>
            {/* <Link to={`${formType}`} >honk</Link> */}
            {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>
            <label >Email
                <input type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                />
            </label>
            <label >Password
                <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                />
            </label>
            {formType === 'signup' ? this.askForUsername() : `${formType}` }
            <button type="submit" >{`${formType}`}</button>
        </form>
        </div>)
    }
}

export default SessionForm;