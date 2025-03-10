import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import anecdoteServices from './requests'
import { createNotification, useNotificationDispatch } from './hooks/notification'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const result = new useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteServices.getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const voteAnecdoteMutation = useMutation({ 
    mutationFn: anecdoteServices.vote,
    onSuccess: anecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(current => 
        current.id === anecdote.id ? anecdote : current
      ))
      
      createNotification(dispatch, `Anecdote '${anecdote.content}' voted`)
    }
   })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>Loading data...</div>

  if (result.isError) return <div>Anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdoteMutation.mutate(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
