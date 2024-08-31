import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { deletePost } from '../api/posts'

export function DeletePost({ postId }) {
  const queryClient = useQueryClient()
  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(postId.toString()),
    onSuccess: queryClient.invalidateQueries(['posts']),
  })

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate()
    }
  }

  return (
    <>
      <button
        className='btn btn-sm btn-outline-danger'
        style={{ border: 'none' }}
        aria-label='Delete Post'
        onClick={handleDelete}
        disabled={deletePostMutation.isLoading}
      >
        {deletePostMutation.isLoading ? (
          <>
            <i className='fa-solid fa-hourglass-half'></i> Deleting...
          </>
        ) : (
          <>
            <i className='fa-regular fa-trash-can'></i> Delete
          </>
        )}
      </button>
      {deletePostMutation.isSuccess && <p>Post deleted successfully!</p>}
    </>
  )
}

DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
}
