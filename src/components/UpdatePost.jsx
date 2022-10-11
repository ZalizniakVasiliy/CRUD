import {Drawer, Button, Form, Schema} from 'rsuite';
import {useState} from "react";
// import PropTypes from 'prop-types';

const {StringType} = Schema.Types;
const model = Schema.Model({
    title: StringType().isRequired('This field is required.'),
    body: StringType().isRequired('This field is required.')
});

const TextField = props => {
    const {name, label, accepter, ...rest} = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
        </Form.Group>
    );
};

const UpdatePost = props => {
    const [postData, setPostData] = useState(props.data);

    const updatePostData = ({target}) => {
        const updatedPostData = {...postData};
        updatedPostData[target.name] = target.value;
        setPostData(updatedPostData);
    };

    const handleSubmit = () => {
        props.handleUpdatePost(postData);
    };

    return (
        <Drawer open={props.open} onClose={props.toggleVisibilityForm}>
            <Drawer.Body>
                <Form
                    model={model}
                    onSubmit={handleSubmit}
                    style={{
                        border: '1px solid lightgrey',
                        padding: '15px',
                        borderRadius: '6px'
                    }}>
                    <TextField name="title"
                               value={postData.title}
                               placeholder='... title'
                               label="Title"
                               onInput={updatePostData}/>
                    <TextField name="body"
                               value={postData.body}
                               placeholder='... body'
                               label="Body"
                               onInput={updatePostData}/>
                    <Button appearance="primary"
                            type="submit"
                            color='green'
                            onClick={props.toggleVisibilityForm}>
                        Submit
                    </Button>
                </Form>
            </Drawer.Body>
        </Drawer>
    );
};

/*PropTypes aren't working except of validator 'isRequired'.
  Don't know, why! I couldn't find a solution despite on compilance
  with the rules of the call 'propTypes' after a component.
  That's why I commented out these fragments of code*/

// UpdatePost.propTypes = {
//     props: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         body: PropTypes.string.isRequired
//     })
// };

// UpdatePost.propTypes = {
//     title: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired
// };

export default UpdatePost;