import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteServices from '../requests'
import { createNotification, useNotificationDispatch } from '../hooks/notification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const createAnecdoteMutation = useMutation({ 
    mutationFn: anecdoteServices.create,
    onSuccess: anecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))

      createNotification(dispatch, `Anecdote '${anecdote.content}' added`)
    },
    onError: error => {
      createNotification(dispatch, error.response.data.error)
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
