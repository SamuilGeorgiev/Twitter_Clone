import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import ComposeTweet from './components/ComposeTweet.jsx';
import Feed from './components/Feed.jsx';
import Profile from './components/Profile.jsx';

import Auth from './components/Auth.jsx';

import logo from './assets/logo.svg';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const addPost = async (content) => {
    if (!user) return;
    await addDoc(collection(db, 'posts'), {
      content,
      timestamp: Date.now(),
      userId: user.uid,
    });
    toast.success('Post submitted!');
  };

  return (
    <Router>
      <div className="main1">
        <header className="">
          <div className="">
            <div >
              <img   src={logo} alt="Minimalist Writer Logo" className="logo" />
              <h1 className="">My Minimalist Writer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="space-x-4">
                <Link to="/" className="text-blue-500 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link to="/profile" className="text-blue-500 hover:text-blue-600 font-medium">
                  Profile
                </Link>
              </nav>
              <Auth setUser={setUser} />
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6">
          {user ? (
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="mb-6">
                      <ComposeTweet onPostSubmit={addPost} />
                    </div>
                    <div>
                      <Feed posts={posts} user={user} />
                    </div>
                  </>
                }
              />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          ) : (
            <p className="text-center text-gray-600">Please log in to view and post content.</p>
          )}
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;