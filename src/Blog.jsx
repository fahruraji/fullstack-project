import { useQuery } from '@tanstack/react-query'
import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { getPosts } from './api/posts.js'
import { useState } from 'react'
import { EditPost } from './components/EditPost.jsx'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const [selectedPost, setSelectedPost] = useState(null)

  const postQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postQuery.data ?? []

  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  const handleCancelEdit = () => {
    setSelectedPost(null)
  }

  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col-8'>
          <div className='row g-3 justify-content-center'>
            <div className='col-auto'>
              <PostFilter
                field='author'
                value={author}
                onChange={(value) => setAuthor(value)}
              />
            </div>
            <div className='col-auto'>
              <PostSorting
                fields={['createdAt', 'updatedAt']}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                orderValue={sortOrder}
                onOrderChange={(orderValue) => setSortOrder(orderValue)}
              />
            </div>
          </div>
          <hr />
          <PostList posts={posts} onPostClick={handlePostClick} />
        </div>
        <div className='col-4'>
          {selectedPost ? (
            <EditPost
              postId={selectedPost._id}
              initialTitle={selectedPost.title}
              initialAuthor={selectedPost.author}
              initialContents={selectedPost.contents}
              initialTags={selectedPost.tags}
              onCancelEdit={handleCancelEdit}
            />
          ) : (
            <CreatePost />
          )}
        </div>
      </div>
    </div>
  )
}
