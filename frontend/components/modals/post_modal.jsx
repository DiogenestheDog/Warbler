import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/modal_actions';
import TextModal from './text_modal';

const PostModal = ({modal, closeModal}) => {
    if (!modal) return null;

    let component;
    switch(modal) {
        case 'text':
            component = <TextModal />;
            break;
        default:
            return null;
    }
    return (
        <div className="post-modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {modal: state.ui.modal}
};

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
