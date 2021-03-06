import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post_actions';
import { closeModal } from '../../actions/modal_actions';

class AudioModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            header: "",
            audioURL: "",
            audioFile: "",
        };

        this.dispatchPost = this.dispatchPost.bind(this);
        this.audioReader = this.audioReader.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.checkFields = this.checkFields.bind(this);
    }

    dispatchPost(e) {
        e.preventDefault();

        if (this.checkFields()) {
            const { header, audioFile } = this.state;
            const user_id = this.props.user.id;
            let formData = new FormData();

            formData.append('post[header]', header ? header : null);
            formData.append('post[user_id]', user_id ? user_id : null);
            formData.append('post[post_type]', "audio");
            if (audioFile) formData.append('post[image]', audioFile);

            this.props.createPost(formData)
                .then(this.props.closeModal());

            this.setState({
                header: "",
                audioURL: "",
                audioFile: null,
            });
        } else { window.alert("fill everything out"); }
    }

    chooseFile(e) {
        e.preventDefault();
        $("#file-input").click();
    }

    audioReader(e) {
        const reader = new FileReader
        const file = e.currentTarget.files[0];
        console.log("audio reading");
        reader.onloadend = () => this.setState({ audioURL: reader.result, audioFile: file });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ audioURL: "", audioFile: null });
        }
    }

    update(type) {
        return e => this.setState({
            [type]: e.currentTarget.value
        });
    }

    checkFields() {
        const { header, audioFile, audioURL } = this.state;
        if (header != false && audioURL != false && audioFile != null) {
            return true
        } else { return false; }
    }

    render() {
        const { username } = this.props.user
        return (
            <div className="post-modal-container">
                <h4 className="pf-username">{username}</h4>
                <form className="post-form">
                    <input type="text" className="post-header" onChange={this.update('header')} placeholder="Title" />
                    {this.state.audioURL ? (<audio controls><source src={this.state.audioURL} type="audio/ogg"></source></audio>) : ""}
                    <div className="file-input-wrapper">
                        <input id="file-input" type="file" onChange={this.audioReader} />
                    </div>
                    <i className="material-icons" id="photo-upload-button" onClick={this.chooseFile} >music_note</i>
                    <button onClick={this.dispatchPost} type="submit">Do it</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ session, entities: { users: users } }) => ({
    user: users[session.id]
});

const mapDispatchToProps = dispatch => ({
    createPost: post => dispatch(createPost(post)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioModal);
