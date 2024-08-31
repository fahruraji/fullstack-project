import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import { DeletePost } from './DeletePost.jsx'

const cardColors = ['#f4a6a6', '#a3d9a5', '#f8e5a1', '#d4d4d4', '#a2c2e0']

export function PostList({ posts = [], onPostClick }) {
  return (
    <div className='d-flex flex-wrap'>
      {posts.map((post, index) => (
        <div
          key={post._id}
          className='card mb-4 d-flex flex-column position-relative mx-auto'
          style={{
            width: '22rem',
            padding: '1.2rem',
            backgroundColor: cardColors[index % cardColors.length],
            color: '#333',
          }}
        >
          <Fragment key={post._id}>
            <div className='d-flex justify-content-between'>
              <button
                className='btn btn-sm btn-outline-secondary'
                style={{ border: 'none' }}
                aria-label='Edit Post'
                onClick={() => onPostClick(post)}
              >
                <i className='fa-regular fa-pen-to-square'></i> Edit
              </button>
              <DeletePost postId={post._id} />
            </div>
            <Post {...post} key={post._id} />
          </Fragment>
        </div>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      contents: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
  onPostClick: PropTypes.func.isRequired,
}
