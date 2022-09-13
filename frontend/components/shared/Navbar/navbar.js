import React from 'react'
import { ConnectButton, NavbarContainer, RightContainer } from './style'

//React icons
import { GrConnect } from 'react-icons/gr'
import { Button } from 'primereact/button'

const Navbar = ({ logout, login }) => {
  return (
    <NavbarContainer>
      <RightContainer>
        {window.walletConnection.isSignedIn() ? (
          <ConnectButton onClick={logout}>
            <GrConnect style={{ marginRight: '8px' }} />
            {window.accountId}
          </ConnectButton>
        ) : (
          <Button className="mt-1" style={{ height: '2rem'}} label="Connect wallet" onClick={login} />
        )}
      </RightContainer>
    </NavbarContainer>
  )
}

export default Navbar
