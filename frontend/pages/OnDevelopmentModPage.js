import React from 'react'
import { logoPNG } from '../assets/img'

// Routing imports
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// Primreact
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'

const OnDevelopmentModPage = ({ login }) => {
  const navigate = useNavigate()

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: 'black', width: '80%', borderRadius: '20px' }}
    >
      <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
        <img src={logoPNG} width="150" height="150" />
      </p>
      <Fieldset legend="On development mode" toggleable>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Fieldset>
      <p
        style={{
          textAlign: 'center',
          marginTop: '2.5em',
          paddingBottom: '2.5em',
        }}
      >
        <Button label="Navigate to Governance" onClick={() =>  navigate("/governance")} />
      </p>
    </div>
  )
}

export default OnDevelopmentModPage
