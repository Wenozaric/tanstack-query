import express from 'express'

const router = express.Router()

router.get('/data', (req, res) => {
	return res
		.status(200)
		.json({ data: [{ name: 'post1' }, { name: 'post2' }, { name: 'post3' }] })
})

export default router