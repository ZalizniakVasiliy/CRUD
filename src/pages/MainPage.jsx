import {useGetPostsQuery} from "../store/postsApi";
import Grid from 'rsuite/Grid';
import List from "rsuite/List";
import Button from 'rsuite/Button';
import {useNavigate} from 'react-router-dom';
import RoutesToPages from "../utils/RoutesToPages";

const MainPage = () => {
    const navigate = useNavigate();
    const {data, isLoading} = useGetPostsQuery();

    if (isLoading) return <h3>Loading...</h3>;

    const handleCreatePost = () => {
        navigate(RoutesToPages.createPost);
    };

    const getWholePost = postId => () => {
        navigate(RoutesToPages.wholePost + postId);
    };

    return (
        <Grid>
            <Button color='cyan'
                    appearance='primary'
                    style={{margin: '10px 0'}}
                    onClick={handleCreatePost}>Create Post
            </Button>
            <List bordered hover>
                {data.map(post => (
                    <List.Item key={post.id}>
                        {post.title}
                        <Button appearance='primary'
                                color='green'
                                style={{marginLeft: '5px'}}
                                onClick={getWholePost(post.id)}>Read more
                        </Button>
                    </List.Item>
                ))}
            </List>
        </Grid>
    );
};

export default MainPage;