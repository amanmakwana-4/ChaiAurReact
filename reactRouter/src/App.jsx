import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import About from "./components/AboutUs"
import Contact from "./components/ContactUs"
import GithubProfile from "./components/GithubProfile"
import { githubInfoLoader } from "./components/githubInfoLoader"

function App() {

  return (
    <>
      <div className="w-full h-screen text-white">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path='/github-profile'
            loader={githubInfoLoader}
            element={<GithubProfile />}/>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
