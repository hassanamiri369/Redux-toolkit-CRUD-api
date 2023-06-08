import { useEffect, useState} from "react"
import { Link, Outlet } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "../features/tutorialSlice"
import { onNavigateNext , onChangeTodosPerpage , onNavigatePrev , onClickCurrentPage } from "../features/tutorialSlice";



const TutorialsList = () => {
  const dispatch = useDispatch()
  const {  dataPosts,  postPerPage , currentPage} = useSelector(state => state.posts)
 


  console.log("data post" , dataPosts)






  useEffect(() => {
    dispatch(getAllData())
  }, [dispatch])



 


  const totalPages = Math.ceil(dataPosts.length / postPerPage)

  const pages = [...Array(totalPages + 1).keys()].slice(1)

  const indexOfLastPage = currentPage * postPerPage
  const indexofFirstPage = indexOfLastPage - postPerPage


  const visibleTodos = dataPosts.slice(indexofFirstPage, indexOfLastPage)



  const navigatePrev = ()=>{
    if(currentPage !== 1){
      dispatch(onNavigatePrev())
    }
  }


  const navigateNext = ()=>{
    if(currentPage !== totalPages){
      dispatch(onNavigateNext())
    }
  }


  const handleChangePage = (_p)=>{
    dispatch(onClickCurrentPage(_p))
  }




  const [text , setText] = useState("")
  const [searchList , setSearchList] = useState([])


  const filteredSearch = ()=>{
    if (text) {

      const upDatePost = dataPosts.filter(item => item.title.toLowerCase().includes(text.toLowerCase()))
      setSearchList(upDatePost)
  } else {
    setSearchList(visibleTodos)
  }
   
  }

  console.log("text" , text)

  useEffect(()=>{
    filteredSearch()


  }, [text , visibleTodos ])

  return (
    <>
      <Outlet/>
      <div >
        <Link className="add-post" to={"/add"}>CREATE POST</Link>
      </div>

      <div className="totalPost">
        {dataPosts.length !== 0 ? <div>
          <h3>Total Post : {dataPosts.length}</h3>
        </div> : <div>no any post</div>}
      </div>

      <div>
        {searchList.length !==0 ? <div>Result : {searchList.length}</div> : <div>no result</div>}
      </div>



      <div>
        <input type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="search" />
      </div>



      <div className="pagination-content">
          <span onClick={navigatePrev} className="prevButton">Prev</span>
          {pages.map((_p) => (<span className="pageNumber" key={_p} onClick={()=> handleChangePage.call(null , _p)}>{_p}</span>))}
          <span onClick={navigateNext} className="nextButton">Next</span>
        </div>


        <div>
          Page {currentPage} of {totalPages}
        </div>

        <div>
          <select onChange={(event)=>{
            dispatch(onChangeTodosPerpage(event.target.value))
          }}>
            <option value={"10"}>10</option>
            <option value={"50"}>50</option>
            <option value={'100'}>100</option>
            <option value={'200'}>200</option>
          </select>
        </div>




      <div className="container">
        {searchList && searchList.map((item) => (
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