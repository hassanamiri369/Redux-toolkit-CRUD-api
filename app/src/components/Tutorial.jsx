import {  useState , useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import {  useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal';
import { deleteTutorial, getAllData } from "../features/tutorialSlice";
Modal.setAppElement('#root');


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Tutorial = () => {

  const {postId} = useParams()
  const navigate = useNavigate()
  const post = useSelector(state => state.posts.dataPosts)
  const dispatch = useDispatch()
  console.log("edit post list" , post)

  useEffect(()=>{
    dispatch(getAllData())
  } , [])



  const findPost = post.find(x => x.id === Number(postId))
  console.log(findPost)


  

 
   // modal

   const [modalIsOpen, setIsOpen] = useState(false);



   function openModal() {
     setIsOpen(true);
   
 
   }
 
   
 
 
 
 
   function closeModal() {
     setIsOpen(false);
   }


   const handleDelete = (id)=>{
    dispatch(deleteTutorial(id))
    closeModal()
    navigate("/")

   }

  return (
    < div className="tutorial-container">
      
      <Link className="go-back" to={'/'}>Go Tutorial List </Link>

      <div className="detail">
        <p>POST ID : </p>
        <p>{findPost && findPost.id}</p>
        <p>TITLE :</p>
        <p>{findPost && findPost.title}</p>
        <p>SKILLS : </p>
        <p>{findPost && findPost.skills}</p>
        <p>DESCRIPTION : </p>
        <p>{findPost && findPost.description}</p>
        
        <div className="box">
          <Link className="edit" to={`/edit/${findPost && findPost.id}`}>edit</Link>
          <button onClick={()=>openModal()}>delete</button>
        </div>
      </div>


      <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h3>Are you sure you want to delete this post?</h3>
                <button onClick={() => handleDelete(findPost && findPost.id)}>delete post</button>

              </Modal>
    </div>
  )
}

export default Tutorial