import { Route, Routes } from "react-router-dom"
import TutorialsList from "./components/TutorialsList"
import AddTutorial from "./components/AddTutorial"
import EditTutorial from "./components/EditTutorial"
import Tutorial from "./components/Tutorial"

function App() {


  return (
    <>
  

      <div className="header">
        <p>Top 10 Front-End Web Development Projects For Beginners</p>
      </div>



      <div>
      <Routes>
        <Route path="/" element={<TutorialsList />} />
        <Route path="/tutorial/:postId" element={<Tutorial/>}/>
        <Route path="/add" element={<AddTutorial />} />
        <Route path="/edit/:id" element={<EditTutorial/>}/>
        
      </Routes>
      </div>
    </>
  )
}

export default App
