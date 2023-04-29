import  {useEffect, useState } from "react";

import { useDispatch, useSelector} from "react-redux";
import { updateToturial } from "../features/tutorialSlice";
import { useNavigate, useParams } from "react-router-dom";



const EditTutorial = () => {

    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const [skills , setSkills] = useState("")
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {id}= useParams()

  const post = useSelector(state => state.posts.dataPosts)
  console.log("edit post list" , post)

  console.log(id)



  const findPost = post.find(x => x.id === Number(id))
  console.log(findPost)


  useEffect(()=>{
    setTitle(findPost && findPost.title)
    setDescription(findPost && findPost.description)
    setSkills(findPost && findPost.skills)

  }, [findPost , id])


  const reset = ()=>{
    setTitle("")
    setDescription("")
    setSkills("")
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!title) return alert("title must be complete")
    if(!description) return alert("description must be complete")
    if(!skills) return alert("skills must be complete")

    const newPost = {id : id , title : title , description :  description ,skills :  skills}
    dispatch(updateToturial(newPost))
    navigate("/")
    reset()

    

  }



  return (
   <div className="form-container">
      <div>updated post</div>

      <div>
        <form onSubmit={(e)=>handleSubmit(e)}>

              <div>
                <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </div>

              <div>
                <input type="skills" placeholder="skills" value={skills} onChange={(e)=>setSkills(e.target.value)}/>
              </div>

              <textarea placeholder="description" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>

              <div className="button-add">
                <button type="submit">update post</button>
              </div>
              
        </form>
      </div>
   </div>
  )
}

export default EditTutorial