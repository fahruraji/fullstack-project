import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

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
          onClick={() => onPostClick(post)} 
          onKeyDown={(e) => e.key === 'Enter' && onPostClick(post)}
          role="button"
          tabIndex="0"
        >
          <Fragment key={post._id}>
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
