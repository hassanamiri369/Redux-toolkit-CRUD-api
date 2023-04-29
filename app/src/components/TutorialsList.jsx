import { useEffect} from "react"
import { Link, Outlet } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "../features/tutorialSlice"




const TutorialsList = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state)
  const { dataPosts } = posts;

  console.log("posts", posts)







  useEffect(() => {
    dispatch(getAllData())
  }, [])



 


 

  return (
    <>
      <Outlet/>
      <div >
        <Link className="add-post" to={"/add"}>CREATE POST</Link>
      </div>

      <div className="container">
        {dataPosts && dataPosts.map((item) => (
          <div className="content" key={item.id} style={{ padding: "30px" }}>
            <p >ID : {item.id}</p>
            <p style={{ fontWeight: "bold", fontSize: "17px", fontStyle: "italic" }}>TITLE : {item.title}</p>
            <p style={{ color: "gray", letterSpacing: "2px", fontSize: "15px", paddingLeft: "30px" }}>DESCRIPTION :{item.description}</p>
            <p style={{ paddingLeft: "30px", fontWeight: "bold", color: "gray" }}>SKILLS : {item.skills}</p>

            <div>
              <Link className="view" to={`/tutorial/${item.id}`}>view more</Link>
            </div>
          </div>
        ))}
      </div>

      {/* modal */}

    </>
  )
}

export default TutorialsList