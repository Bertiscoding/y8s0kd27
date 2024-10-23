import { useState, useEffect } from 'react'
import CommentContainer from './components/CommentContainer'
import UserLogin from './components/UserLogin'
import { useUser } from './context/UserContext'

function App() {
  const { user } = useUser()
  const [commentView, setCommentView] = useState(!!user)

  useEffect(() => {
    setCommentView(!!user)
  }, [user])

  return (
    <div className="w-screen min-h-screen bg-brand-dark flex items-center">
      <div className="relative bg-white rounded-md p-base w-[425px] h-[90vh] mx-auto">
        { commentView ? (
          <div className="h-[100%] overflow-y-scroll pb-[225px]">
            <CommentContainer />
          </div>
        ) : (
          <UserLogin setCommentView={setCommentView} />
        )}
      </div>
    </div>
  )
}

export default App
