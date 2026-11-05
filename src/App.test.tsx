import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the counter button starting at 0', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
  })
})
