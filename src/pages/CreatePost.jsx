import {Form, Button, Schema, Grid, IconButton, Row, Col} from 'rsuite';
import PageIcon from "@rsuite/icons/Page";
import {useNavigate} from "react-router-dom";
import RoutesToPages from "../utils/RoutesToPages";
import {useCreatePostMutation} from "../store/postsApi";
import {useState} from "react";

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

const formDefaultData = {
    title: '',
    body: ''
};

const CreatePost = () => {
    const navigate = useNavigate();
    const [createPost, {isLoading: isCreating}] = useCreatePostMutation();
    const [postData, setPostData] = useState({...formDefaultData});

    if (isCreating) return <h3>Loading...</h3>;

    const goToMainPage = () => {
        navigate(RoutesToPages.mainPage);
    };

    const updatePostData = ({target}) => {
        const updatedPostData = {...postData};
        updatedPostData[target.name] = target.value;
        setPostData(updatedPostData);
    };

    const createPostHandler = async () => {
        const requestData = await createPost({...postData}).unwrap();
        setPostData({...formDefaultData});
    };

    return (
        <Grid>
            <IconButton icon={<PageIcon/>}
                        appearance='ghost'
                        color='green'
                        style={{margin: '10px 0'}}
                        onClick={goToMainPage}> Main Page
            </IconButton>
            <Row>
                <Col>
                    <Form model={model}
                          style={{
                              border: '1px solid lightgrey',
                              padding: '15px',
                              borderRadius: '6px'
                          }}
                          onSubmit={createPostHandler}>
                        <TextField name="title"
                                   value={postData['title']}
                                   placeholder='... title'
                                   label="Title"
                                   onInput={updatePostData}/>
                        <TextField name="body"
                                   value={postData['body']}
                                   placeholder='... body'
                                   label="Body"
                                   onInput={updatePostData}/>
                        <Button appearance="primary"
                                type="submit"
                                color='green'>Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Grid>
    );
};

export default CreatePost;