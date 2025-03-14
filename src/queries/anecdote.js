import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import anecdoteService from '../services/anecdote'
import { useCreateNotification } from '../hooks/notification'

export const useQueryAnecdotes = () => {
    return useQuery({
        queryKey: ['anecdotes'],
        queryFn: anecdoteService.getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })
}

export const useMutationCreateAnecdote = () => {
    const queryClient = useQueryClient()
    const createNotification = useCreateNotification()

    return useMutation({
        mutationFn: anecdoteService.create,
        onSuccess: anecdote => {
            const anecdotes = queryClient.getQueryData(['anecdotes']).concat(anecdote)
            queryClient.setQueryData(['anecdotes'], anecdotes)
            createNotification(`Anecdote '${anecdote.content}' added`)
        },
        onError: error => {
            createNotification(error.response.data.error)
        }
    })
}

export const useMutationVoteAnecdote = () => {
    const queryClient = useQueryClient()
    const createNotification = useCreateNotification()

    return useMutation({
        mutationFn: anecdoteService.vote,
        onSuccess: anecdote => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
                .map(current => current.id === anecdote.id ? anecdote : current)

            queryClient.setQueryData(['anecdotes'], anecdotes)
            createNotification(`Anecdote '${anecdote.content}' voted`)
        }
    })
}