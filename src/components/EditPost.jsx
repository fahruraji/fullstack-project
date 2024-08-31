import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { updatePost } from '../api/posts'

const available_tags = (
  import.meta.env.VITE_AVAILABLE_TAGS || 'mongoose,mongodb,react,nodejs,express'
).split(',')

export function EditPost({
  postId,
  initialTitle,
  initialAuthor,
  initialContents,
  initialTags,
  onCancelEdit,
}) {
  const [title, setTitle] = useState(initialTitle)
  const [author, setAuthor] = useState(initialAuthor)
  const [contents, setContents] = useState(initialContents)
  const [tags, setTags] = useState(initialTags || [])

  const queryClient = useQueryClient()

  useEffect(() => {
    setTitle(initialTitle)
    setAuthor(initialAuthor)
    setContents(initialContents)
    setTags(initialTags || [])
  }, [initialTitle, initialAuthor, initialContents, initialTags])

  const updatePostMutation = useMutation({
    mutationFn: (updatedPost) => updatePost(postId.toString(), updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      onCancelEdit()
    },
  })

  const handleTagChange = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedPost = { title, author, contents, tags }
    updatePostMutation.mutate(updatedPost)
  }

  return (
    <div
      className='card shadow-sm p-3 mb-4 bg-warning rounded'
      style={{ maxWidth: '600px', margin: 'auto' }}
    >
      <div className='card-body'>
        <h3 className='card-title mb-3'>Edit Post</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='edit-title' className='form-label'>
              Title:
            </label>
            <input
              type='text'
              className='form-control'
              name='edit-title'
              id='edit-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='edit-author' className='form-label'>
              Author:
            </label>
            <input
              type='text'
              className='form-control'
              name='edit-author'
              id='edit-author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='edit-contents' className='form-label'>
              Content:
            </label>
            <textarea
              className='form-control'
              name='edit-contents'
              id='edit-contents'
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <h6>Select Tags:</h6>
            {available_tags.map((tag) => (
              <div className='form-check form-check-inline' key={tag}>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`tag-${tag}`}
                  value={tag}
                  checked={tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <label className='form-check-label ms-2' htmlFor={`tag-${tag}`}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
          <div className='d-flex gap-3 justify-content-end'>
            <button
              type='button'
              className='btn btn-outline-secondary'
              onClick={onCancelEdit}
            >
              Cancel Edit
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={!title || updatePostMutation.isPending}
            >
              {updatePostMutation.isPending ? 'Updating...' : 'Update Post'}
            </button>
          </div>
          {updatePostMutation.isSuccess ? (
            <div className='mt-3 alert alert-success'>
              Post edited successfully!
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}

EditPost.propTypes = {
  postId: PropTypes.string.isRequired,
  initialTitle: PropTypes.string.isRequired,
  initialAuthor: PropTypes.string,
  initialContents: PropTypes.string,
  initialTags: PropTypes.string,
  onCancelEdit: PropTypes.func.isRequired,
}
