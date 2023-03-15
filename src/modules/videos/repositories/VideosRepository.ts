import {v4 as uuidv4 } from "uuid";
import { pool } from "../../../mysql";
import { Request , Response } from "express";

class VideosRepository {
 create(request:Request , response: Response){
    const {user_id , title , description} = request.body;
    pool.getConnection((err:any , connection: any) => {
        connection.query(
            'INSERT INTO videos (videos_id , user_id , title , description) VALUES (?,?,?,?)',
            [uuidv4() , user_id , title , description],
            (error: any , result:any , fileds:any ) =>{
                connection.release();  
                if(error){
                    return response.status(400).json(error)
                }
                return response.status(200).json({message: 'video criado com sucesso'})
            }
        )
    })

 }
 getVideos(request: Request , response: Response){
    const {user_id} = request.body;
    pool.getConnection((err:any , connection: any) => {
            connection.query(
               'SELECT * FROM videos WHERE user_id=?',
               [user_id],
               (error: any , results:any , fileds:any ) =>{
                  connection.release();  
                    if(error){
                       return response.status(400).json({error: "Erro ao buscar videos"})
                    }
                       return response.status(200).json({ message: 'Videos retornados com sucesso', videos: results})
               }
            )
        
    })
 }
 searchVideos(request: Request , response: Response){
   const {search} = request.query;
   pool.getConnection((err:any , connection: any) => {
           connection.query(
              'SELECT * FROM videos WHERE title LIKE ?',
              [`%${search}%`],
              (error: any , results:any , fileds:any ) =>{
                 connection.release();  
                   if(error){
                      return response.status(400).json({error: "Erro ao buscar videos"})
                   }
                      return response.status(200).json({ message: 'Videos retornados com sucesso', videos: results})
              }
           )
       
   })
}
}

export {VideosRepository};