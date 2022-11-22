import { NextApiRequest, NextApiResponse } from 'next'

import { submitPost } from '../../lib/submit_form/client'

const ApiAddsubmit = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.setHeader('Content-Type', 'application/json')
  if (req.method !== 'POST') {
    res.statusCode = 400
    res.end()
    return
  }

  const submitData = req.body

  if (!submitData) {
    res.statusCode = 400
    res.end()
    return
  }

  try {
    await submitPost(submitData)

    res.statusCode = 200
    res.end()
  } catch (e) {
    console.log(e)
    res.statusCode = 500
    res.end()
  }
}

export default ApiAddsubmit
