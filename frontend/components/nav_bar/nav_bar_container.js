import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import NavBar from './nav_bar';

const mapStateToProps = (state, ownProps) => {
    return ({
    loggedIn: Boolean(state.session.id),
    path: ownProps.location.pathname
    });}

const mapDispatchToProps = dispatch => ({
    signup: (user) => dispatch(signup(user)),
    logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));