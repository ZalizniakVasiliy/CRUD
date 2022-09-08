import {
    useGetPostsByIdQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
    useGetCommentsQuery,
} from "../store/postsApi";
import {useNavigate, useParams} from "react-router-dom";
import {
    Container, Header, Content,
    Button, ButtonToolbar, Sidebar,
    IconButton, Grid, List, Drawer
}
    from 'rsuite';
import PageIcon from "@rsuite/icons/Page";
import RoutesToPages from "../utils/RoutesToPages";
import {useState} from "react";
import UpdatePost from "../components/UpdatePost";

const WholePost = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [deletePost, {isLoading: isRemoving}] = useDeletePostMutation();
    const [updatePost] = useUpdatePostMutation(id);
    const {data, isLoading} = useGetPostsByIdQuery(id);
    const {data: comments} = useGetCommentsQuery(id);
    const [open, setOpen] = useState(false);

    if (isLoading) return <h3>Loading...</h3>;

    const toggleVisibilityForm = () => {
        setOpen(!open);
    };

    const goToMainPage = () => {
        navigate(RoutesToPages.mainPage);
    };

    const handleDeletePost = () => {
        deletePost(id);
        navigate(RoutesToPages.mainPage);
    };

    const handleUpdatePost = singlePostData => {
        const updatingData = {...data};
        updatingData.title = singlePostData.title;
        updatingData.body = singlePostData.body;
        updatePost(updatingData);
    };

    return (
        <Grid>
            <IconButton icon={<PageIcon/>}
                        appearance='ghost'
                        color='green'
                        style={{margin: '10px 0'}}
                        onClick={goToMainPage}>Main Page
            </IconButton>
            <Container>
                <Sidebar>
                    <List bordered>
                        {comments.map(comment => (
                            <List.Item key={comment.id}>
                                <p style={{fontStyle: 'italic'}}>{comment.name}</p>
                                <p style={{fontWeight: 'bold'}}>{comment.email}</p>
                                <p>{comment.body}</p>
                            </List.Item>
                        ))}
                    </List>
                </Sidebar>
                <Container style={{marginLeft: '15px',}}>
                    <Header style={{fontSize: '24px', marginBottom: '15px'}}>
                        {data.title}
                    </Header>
                    <Content>
                        {data.body}

                        <UpdatePost
                            toggleVisibilityForm={toggleVisibilityForm}
                            open={open}
                            data={data}
                            handleUpdatePost={handleUpdatePost}
                        />

                        <ButtonToolbar style={{
                            marginTop: '15px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button color="orange"
                                    appearance="primary"
                                    onClick={toggleVisibilityForm}>
                                Update Post
                            </Button>
                            <Button color="red"
                                    appearance="primary"
                                    onClick={handleDeletePost}>
                                Delete Post
                            </Button>
                        </ButtonToolbar>
                    </Content>
                </Container>
            </Container>
        </Grid>
    );
};

export default WholePost;