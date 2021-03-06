import React from 'react';
import { connect } from 'react-redux';

import { createPost } from '../../actions/post_actions';
import { closeModal } from '../../actions/modal_actions';

class TextModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photoFile: null,
            photoUrl: "",
            header: "",
            body: "",
            imageUrl: "",
            imageFile: null
        };
        // this.previewNewAvatar = this.previewNewAvatar.bind(this);
        this.dispatchPost = this.dispatchPost.bind(this);
        this.imageReader = this.imageReader.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.checkFields = this.checkFields.bind(this);
    }
    
    // previewNewAvatar(e) {
    //     const reader = new FileReader();
    //     const file = e.currentTarget.files[0];
    //     reader.onloadend = () => {
    //         return this.setState({
    //             photoFile: file,
    //             photoUrl: reader.result
    //         });
    //     };
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     } else {
    //         this.setState({ photoFile: null, photoUrl: "" });
    //     }
    // }

    dispatchPost(e) {
        e.preventDefault();

        if (this.checkFields()) {
            const { header, body, imageFile } = this.state;
            const user_id = this.props.user.id;
            let formData = new FormData();

            formData.append('post[header]', header ? header : null);
            formData.append('post[body]', body ? body : null);
            formData.append('post[user_id]', user_id ? user_id : null);
            formData.append('post[post_type]', "text");
            if (imageFile) formData.append('post[image]', imageFile);

            this.props.createPost(formData)
                .then(this.props.closeModal());
            
            this.setState({
                header: "",
                body: "",
                imageUrl: "",
                imageFile: null,
            });
        } else {
            window.alert("fill everything out :(");
        }
    }

    chooseFile(e) {
        e.preventDefault();
        $("#file-input").click();
    }

    imageReader(e) {
        const reader = new FileReader
        const file = e.currentTarget.files[0];
        reader.onloadend = () => this.setState({ imageUrl: reader.result, imageFile: file });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageUrl: "", imageFile: null });
        }
    }

    update(type) {
        return e => this.setState({
            [type]: e.currentTarget.value
        });
    }

    checkFields() {
        const { body, header } = this.state;
        if (body != false && header != false) {
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
                    <textarea className="post-body" type="text" onChange={this.update('body')} placeholder="Your thoughts here" />
                    {this.state.imageUrl ? (<img src={this.state.imageUrl} className="image-preview" />) : ""}
                    <div className="file-input-wrapper">
                        <input id="file-input" type="file" onChange={this.imageReader} />
                    </div>
                    <i className="material-icons" id="photo-upload-button" onClick={this.chooseFile} >photo_camera</i>
                    <button onClick={this.dispatchPost} type="submit">Do it</button>
                    <i className="material-icons like_button">favorite_border</i>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ session, entities: {users: users} }) => ({
    user: users[session.id]
});

const mapDispatchToProps = dispatch => ({
    createPost: post => dispatch(createPost(post)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(TextModal);