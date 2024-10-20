import { useState, useEffect } from 'react';
import CommentContainer from './components/CommentContainer'
import CommentCreateContainer from './components/CommentCreateContainer'

function App() {
  const [userName, setUserName] = useState({
    authorFirstName: '',
    authorLastName: '',
    authorId: 4,
  })

  const isFormValid = userName.authorFirstName && userName.authorLastName ? true : false
  const [commentView, setCommentView] = useState(isFormValid)
  
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      setUserName(JSON.parse(savedUserName))
      setCommentView(true)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserName((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentView(isFormValid)
    localStorage.setItem('userName', JSON.stringify(userName));
  }
  
  return (
    <div className="w-screen min-h-screen bg-brand-dark flex items-center">
    <div className="relative bg-white rounded-md p-base w-[425px] h-[90vh] mx-auto">
      {commentView ? (
        <>
          <div className="h-[100%] overflow-y-scroll pb-[225px]">
            <CommentContainer />
          </div>
          <div className="absolute w-full bottom-0 left-0">
            <CommentCreateContainer userName={userName}/>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-semibold text-center my-9">
            Enter your user name
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              required
              value={userName.authorFirstName}
              type="text"
              onChange={handleChange}
              name="authorFirstName"
              placeholder="First name"
              className="border border-brand-primary rounded-md mb-4 w-[80%] px-base py-2 mx-auto"
            />
            <input
              required
              value={userName.authorLastName}
              type="text"
              onChange={handleChange}
              name="authorLastName"
              placeholder="Last name"
              className="border border-brand-primary rounded-md mb-4 w-[80%] px-base py-2 mx-auto"
            />
            <div className="flex justify-center">
              <button
                disabled={!isFormValid}
                type="submit"
                className="bg-brand-primary disabled:bg-brand-grey-light rounded-md text-white font-semibold fit-content px-5 py-3"
              >
                Save name and continue
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
  )
}

export default App;
