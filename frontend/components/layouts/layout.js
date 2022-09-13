import React from 'react'
import Navbar from '../shared/Navbar/navbar'
import Sidebar from '../shared/Sidebar/sidebar'
import { SLayout, SMain } from './styles'

const Layout = ({ children }) => {
  return (
    <SLayout>
      <Sidebar />
      <SMain>{children}</SMain>
    </SLayout>
  )
}

export default Layout
