import { useQueryAnecdotes, useMutationVoteAnecdote } from "../queries/anecdote"

const AnecdoteList = () => {
    const result = useQueryAnecdotes()
    const { mutate: vote } = useMutationVoteAnecdote()

    if (result.isLoading) return <div>Loading data...</div>
    if (result.isError) return <div>Anecdote service not available due to problems in server</div>
    
    const anecdotes = [...result.data].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList