import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useComments } from '../context/CommentsContext'
import { useUser } from '../context/UserContext'
import Comment from '../components/Comment'

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

describe('Comment', () => {
  const mockUpdateComment = jest.fn()
  const mockUser = {
    id: '0',
    authorFirstName: 'Dan',
    authorLastName: 'Druff',
    authorId: 4,
  }

  const mockComment = {
    id: '1723473122',
    text: 'Original comment',
    createdOn: '2024-01-01T12:00:00Z',
    edited: false,
    authorId: 4,
  }

  beforeEach(() => {
    useUser.mockReturnValue({
      user: mockUser,
    })
    
    // User is the author of the comment
    useComments.mockReturnValue({
      updateComment: mockUpdateComment,
      isAuthor: jest.fn().mockReturnValue(true),
    })
  })

  test('should allow user to edit a comment', () => {
    render(<Comment {...mockComment} />)

    // Display original comment
    expect(screen.getByText('Original comment')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('updateCommentButton'))

    // Find input form
    const input = screen.getByTestId('commentEditFormInput')
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('Original comment')

    // Update text
    fireEvent.change(input, { target: { value: 'Updated comment' } })

    // Submit changes
    fireEvent.click(screen.getByTestId('saveUpdatedCommentButton'))

    // Verify updateComment is called with the correct arguments
    expect(mockUpdateComment).toHaveBeenCalledWith('1723473122', 'Updated comment')
  })
})

afterAll(() => {
  console.warn.mockRestore()
  console.error.mockRestore()
})

jest.clearAllMocks()
