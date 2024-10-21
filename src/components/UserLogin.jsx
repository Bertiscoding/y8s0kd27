import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const UserLogin = ({ setCommentView }) => {
  const { setUser } = useUser()

  const [userName, setUserName] = useState({
    authorFirstName: '',
    authorLastName: '',
    authorId: 4,
  })

  const isFormValid = !!(userName.authorFirstName.trim() && userName.authorLastName.trim())

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      const parsedUserName = JSON.parse(savedUserName)
      setUserName(parsedUserName)
      setUser(parsedUserName)
      setCommentView(true)
    }
  }, [setCommentView, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserName((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userName) return
  
    localStorage.setItem('userName', JSON.stringify(userName))
    setUser(userName)
    setCommentView(isFormValid)
  }

  return (
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
  )
}
export default UserLogin
