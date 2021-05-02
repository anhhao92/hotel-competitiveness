import { render, screen } from '@testing-library/react'
import App from './App'

test('renders select component', () => {
  render(<App />)
  const selectElement = screen.findByRole('select')
  expect(selectElement).toBeTruthy()
})
