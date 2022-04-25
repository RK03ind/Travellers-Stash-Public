import Users from "./users/pages/Users";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import NewPost from "./new-post/pages/NewPost";
import Landing from "./landing/pages/Landing";
import Login from "./login/login";
import Feed from "./feed/pages/Feed";
import use100vh from "./hooks/use100vh";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Signup from "./signup/signup";
import Toast from "./shared/components/Toast/Toast";
import Post from "./post/pages/Post";
import EditProfile from "./edit-profile/pages/EditProfile";
import UserProfile from "./user-profile/pages/UserProfile";
import Saves from "./saves/pages/Saves";
const queryClient = new QueryClient();

function App() {
  //fixing 100vh problem for mobile devices
  document.querySelector("#root").style.height = use100vh();
  const authCtx = useContext(AuthContext);
  if (authCtx.userData) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<Feed />} />
              <Route path="/explore" element={<Users />} />
              <Route path="/saves" element={<Saves />} />
              <Route path="/post/:pid" element={<Post />} />
              <Route path="/user/:uid" element={<UserProfile />} />
              <Route path="/post/new" element={<NewPost />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          </Router>
        </QueryClientProvider>
        <Toast />
      </>
    );
  } else {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="*" element={<Navigate to="/landing" />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/explore" element={<Users />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/post/:pid" element={<Post />} />
              <Route path="/user/:uid" element={<UserProfile />} />
              <Route path="/post/new" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </QueryClientProvider>
        <Toast />
      </>
    );
  }
}

export default App;
