import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteServices from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation({ 
    mutationFn: anecdoteServices.create,
    onSuccess: anecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
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
