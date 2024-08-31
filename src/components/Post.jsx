import PropTypes from 'prop-types'

export function Post({ title, contents, author, tags }) {
  return (
    <article>
      <div className='card-body'>
        <h4 className='card-title'>{title}</h4>
        <p className='card-subtitle mt-3 text-body-secondary'>
          {author && (
            <em>
              Written by <strong>{author}</strong>
            </em>
          )}
        </p>
        <hr />
        <div className='card-text'>{contents}</div>
        {tags && (
          <small>
            <br />
            Tags: {tags.join(', ')}
          </small>
        )}
      </div>
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}
