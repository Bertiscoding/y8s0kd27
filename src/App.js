import { useState } from 'react';
import CommentContainer from './components/CommentContainer'
import UserLogin from './components/UserLogin';

function App() {
  const [commentView, setCommentView] = useState(false)

  return (
    <div className="w-screen min-h-screen bg-brand-dark flex items-center">
      <div className="relative bg-white rounded-md p-base w-[425px] h-[90vh] mx-auto">
        {commentView ? (
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

export default App;
