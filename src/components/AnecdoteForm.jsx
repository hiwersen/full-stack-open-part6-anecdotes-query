import { useMutationCreateAnecdote } from '../queries/anecdote'

const AnecdoteForm = () => {
    const { mutate: create } = useMutationCreateAnecdote()

    const handleCreate = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        create(content)
    }

    return (
        <div style={{ marginBottom: 18 }}>
            <h3>create new</h3>
            <form onSubmit={handleCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
