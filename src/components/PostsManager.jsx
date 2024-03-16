import {useContext, useState} from 'react'
import {ColorContext} from '../providers/ColorProvider';
import ColorService from '../services/ColorService.js';
import { Post } from './Post.jsx';

export function PostsManager() {
    const [postsArr, setPostsArr] = useState([
        {
            id: 1,
            title: 'title1',
            text: 'desc1'
        },
        {
            id: 2,
            title: 't2',
            text: 'desc2'
        },
    ]);

    return (
        <div className="posts__container">
            {postsArr.map(post => 
                <Post
                    title={post.title}
                    text={post.text}
                    key={post.id}
                />
            )}
        </div>
    )
}