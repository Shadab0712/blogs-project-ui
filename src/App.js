import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Userdashboard from './user-routes/Userdashboard';
import Privateroute from './user-routes/Privateroute';
import ProfileInfo from './user-routes/ProfileInfo';
import Feeds from './component/Feeds';
import PostPage from './pages/PostPage';
import Services from './pages/Services';
import Categories from './pages/Categories';
import About from './pages/About';
import Home from './pages/Home';
import UpdateBlog from './pages/UpdateBlog';

function App() {
  return (
    <div className="App">
    <Router>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/feeds" element={<Feeds />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
        <Route path="/category/:categoryId" element={<Categories />}></Route>

        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<Userdashboard />}></Route>
          <Route path="profile-info/:userId" element={<ProfileInfo />}></Route>
          <Route path="update-blog/:postId" element={<UpdateBlog />}></Route>
        </Route>
      </Routes>
    </Router>
</div>
  );
}

export default App;
