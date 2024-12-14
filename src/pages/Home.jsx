import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1723083661335-c88891b92323?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen flex  justify-between flex-col bg-red-400 pt-8">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png" className="w-16 ml-8" alt="" />
        <div className="bg-white py-4 px-4 pb-7">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
            <Link to={"/login"}  className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 ">Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home