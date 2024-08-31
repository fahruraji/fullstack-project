import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

const available_tags = (
  import.meta.env.VITE_AVAILABLE_TAGS || 'mongoose,mongodb,react,nodejs,express'
).split(',')

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')
  const [tags, setTags] = useState('')
  const [showToast, setShowToast] = useState(false)

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents, tags }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      resetForm()
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    },
  })

  const handleTagChange = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    )
  }

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setContents('')
    setTags([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <>
      <div
        className='card shadow-sm p-3 mb-4 bg-info rounded'
        style={{ maxWidth: '600px', margin: 'auto' }}
      >
        <div className='card-body'>
          <h3 className='card-title mb-3'>Create Post</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='create-title' className='form-label'>
                Title:
              </label>
              <input
                type='text'
                className='form-control'
                name='create-title'
                id='create-title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='create-author' className='form-label'>
                Author:
              </label>
              <input
                type='text'
                className='form-control'
                name='create-author'
                id='create-author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='create-contents' className='form-label'>
                Content:
              </label>
              <textarea
                className='form-control'
                name='create-contents'
                id='create-contents'
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
                  <label
                    className='form-check-label ms-2'
                    htmlFor={`tag-${tag}`}
                  >
                    {tag}
                  </label>
                </div>
              ))}
            </div>
            <div className='d-flex gap-3 justify-content-end'>
              <button
                type='submit'
                className='btn btn-primary px-5'
                disabled={!title || createPostMutation.isPending}
              >
                {createPostMutation.isPending ? 'Submiting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div aria-live='polite' aria-atomic='true' className='position-relative'>
        <div className='toast-container position-fixed bottom-0 end-0 p-3'>
          <div
            className={`toast ${showToast ? 'show' : 'hide'}`}
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
          >
            <div className='toast-header'>
              <strong className='me-auto'>Success</strong>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='toast'
                aria-label='Close'
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className='toast-body'>Post created successfully!</div>
          </div>
        </div>
      </div>
    </>
  )
}
