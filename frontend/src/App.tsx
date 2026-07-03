import './style.css'
import { exampleService } from './api/services'
import { useQuery } from '@tanstack/react-query'
import { type Post } from './types/types'

function App() {

	const fetchData = async () => {
		const res = await exampleService.fetchData()
		return res.data
	}

	const { data} = useQuery<Post[]>({
		queryKey: ["posts"],
		queryFn: fetchData
	})
	
	return (
		<div className='m-12'>
			{data?.map((post, id) => <div key={id}>{post.name}</div>)}
		</div>
	)
}

export default App
