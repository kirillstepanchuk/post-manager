import React, { useEffect, useRef, useState } from 'react';

import PostService from '../API/PostService';
import PostFilter from '../Components/PostFilter';
import PostForm from '../Components/PostForm';
import PostList from '../Components/PostList';
import MyButton from '../Components/UI/button/MyButton';
import Loader from '../Components/UI/loader/Loader';
import MyModal from '../Components/UI/modal/MyModal';
import Pagination from '../Components/UI/pagination/Pagination';
import MySelect from '../Components/UI/select/MySelect';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchesPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))

    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">

            <MyButton style={{ marginTop: '30px', marginBottom: '15px' }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect 
                value={limit} 
                onChange={value => setLimit(value)} 
                defaultValue='Кол-во элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />

            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }

            <PostList remove={removePost} posts={sortedAndSearchesPosts} title='Посты про JS' />

            <div ref={lastElement} style={{height: '20px', background: 'teal', marginTop: '15px'}}/>

            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
            }

            <Pagination page={page} totalPages={totalPages} changePage={changePage} />

        </div>
    );
}

export default Posts;
