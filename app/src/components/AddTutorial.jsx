import  {useState } from "react";

import { useDispatch} from "react-redux";
import { createTutorial } from "../features/tutorialSlice";
import { useNavigate } from "react-router-dom";



const AddTutorial = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [skills , setSkills] = useState("")

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

    const newPost = {id : Number(new Date()) , title : title , description :  description ,skills :  skills}
    dispatch(createTutorial(newPost))
    navigate("/")
    reset()

    

  }



  return (
   <div className="form-container">
      <div>Create new post</div>

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
                <button type="submit">create post</button>
              </div>
              
        </form>
      </div>
   </div>
  )
}

export default AddTutorial