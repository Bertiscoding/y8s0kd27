import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useComments } from '../context/CommentsContext'
import { useUser } from '../context/UserContext'
import CommentCreateContainer from '../components/CommentCreateContainer'

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

jest.mock('../context/CommentsContext', () => ({
  useComments: jest.fn(),
}))

jest.mock('../context/UserContext', () => ({
  useUser: jest.fn(),
}))

describe('CommentCreateContainer', () => {
  const mockAddComment = jest.fn()
  const mockUser = {
    id: '1723473122',
    authorFirstName: 'Dan',
    authorLastName: 'Druff',
    authorId: 4,
  }

  beforeEach(() => {
    useUser.mockReturnValue({
      user: mockUser,
    })

    useComments.mockReturnValue({
      addComment: mockAddComment,
    })
  })

  test('should be able to add a new comment', () => {
    render(<CommentCreateContainer onAddComment={mockAddComment} />)

    const input = screen.getByTestId('commentCreateFormInput')
    const saveCommentButton = screen.getByTestId('saveCommentButton')
    
    // Enter a comment
    fireEvent.change(input, { target: { value: 'This is a comment' } })

    // Save comment
    fireEvent.click(saveCommentButton)

    // Verify addComment is called with the correct arguments
    expect(mockAddComment).toHaveBeenCalledWith(expect.objectContaining({
      text: 'This is a comment',
      authorFirstName: 'Dan',
      authorLastName: 'Druff',
      authorId: 4,
    }))
  })
})

afterAll(() => {
  console.warn.mockRestore()
  console.error.mockRestore()
})

jest.clearAllMocks()
