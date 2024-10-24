import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useComments } from '../context/CommentsContext'
import { useUser } from '../context/UserContext'
import CommentReply from '../components/CommentReply'

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

describe('CommentReply', () => {
  const mockAddReply = jest.fn()
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
      isAuthor: jest.fn().mockReturnValue(true),
    })
  })

  test('should be able to add a reply to a comment', () => {
    render(<CommentReply reply={null} replyMode={true} onAddReply={mockAddReply} />)

    const input = screen.getByTestId('replyCreateFormInput')
    const saveReplyButton = screen.getByTestId('saveReplyButton')
    // Enter a reply
    fireEvent.change(input, { target: { value: 'This is a reply' } })

    // Save reply
    fireEvent.click(saveReplyButton)

    // Verify addReply is called with the correct arguments
    expect(mockAddReply).toHaveBeenCalledWith('This is a reply')
  })
})

afterAll(() => {
  console.warn.mockRestore()
  console.error.mockRestore()
})

jest.clearAllMocks()
