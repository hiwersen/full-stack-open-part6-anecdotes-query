import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdoteServices from './requests'

const App = () => {
  const result = new useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteServices.getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>Loading data...</div>

  if (result.isError) return <div>Anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
