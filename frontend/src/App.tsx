import './style.css'
import { exampleService } from './api/services'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { type Post } from './types/types'

function App() {

	const queryClient = useQueryClient()

	const fetchData = async () => {
		const res = await exampleService.fetchData()
		return res.data
	}

	const { data, isLoading, isPending, isFetching } = useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: fetchData,
		staleTime: 5000,
		//refetchInterval: 10000,
	})

	const staleData = () => {
		queryClient.invalidateQueries({ queryKey: ['posts']})
	}

	return (
		<div className='m-12'>
			{isLoading && <div>Loading</div>}
			{isPending && <div>Pending</div>}
			{isFetching && <div>Fetching</div>}
			{data?.map((post, id) => (
				<div key={id}>{post.name}</div>
			))}
			<button className='border p-4' onClick={staleData}>
				Invalidate
			</button>
		</div>
	)
}

export default App
