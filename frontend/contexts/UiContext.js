import { createContext, useState } from 'react'

export const UiContext = createContext()

export const UiProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <UiContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </UiContext.Provider>
  )
}
