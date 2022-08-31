/* eslint-disable @typescript-eslint/space-before-function-paren */
import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'

import UserInterface  from 'src/interfaces/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInterface | object>
) {
  const { method, query, body } = req
  const paramID = query.id
  const id = Number(paramID)


  //
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM public."Users" WHERE "ID" = $1'
        const values = [id]
        const result = await conn.query(query, values)

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'not found' })
        }
        return res.json(result.rows[0])
      } catch (error) {
        return res.status(400).json({ error })
      }
        break;

    //
    case 'PUT':
    // take the user from the body and update it   
        const { userName, email, password, followers, following, collections_done, role, image, liked, ID } = body
        console.log('BODY received by backend: ', body)
        
        const query = 'UPDATE public."Users" SET "userName" = $1, "email" = $2, "password" = $3, "followers" = $4, "following" = $5, "collections_done" = $6, "role" = $7, "image" = $8, "liked" =$9 WHERE "ID" = $10'
        
        
        const values = [userName, email, password,JSON.stringify(followers) ,JSON.stringify(following), collections_done, role, image, JSON.stringify(liked),ID]
        await conn.query(query, values).then((result: { rows: (object | UserInterface)[] }) => {
          return res.json(result)
          })
          
        break;

        
        
    //
    case 'DELETE':
      try {
        const query = 'DELETE FROM public."Users" WHERE "ID" = $1 RETURNING *'
        const values = [id]

        const response = await conn.query(query, values)
        return res.json(response)
      } catch (error) {
        return res.status(400).json({ error })
      }
        break;



    //
    default:
      return res.status(404).json({ error: 'not found' })
            break;

  }
}
