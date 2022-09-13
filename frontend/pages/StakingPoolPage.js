import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StakingPoolPage = () => {
  const params = useParams()


  const items = [
    { label: `Staking`, url: '/stake' },
    { label: `${params.pool_name}` },
  ]

  const home = {
    icon: 'pi pi-home',
    url: '/',
  }
  return (
    <>
      <Section>
        <BreadCrumb model={items} home={home} />
      </Section>
      <Section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Bitcoin_lightning_logo.svg/1200px-Bitcoin_lightning_logo.svg.png"
                width="150"
              />
            </div>
            <div className="col-md-9">
              <h1 style={{ fontSize: '3rem' }}>Thunder</h1>
              <p className="mt-4" style={{ color: 'grey', cursor: 'pointer' }}>
                www.thunder.com &nbsp;
                <FaExternalLinkAlt />
              </p>
              <p className="mt-4">
                Cupidatat laboris duis in nisi ex magna ex amet. Qui duis aute
                nulla in. Id laboris ad pariatur do velit incididunt. Nostrud
                cupidatat incididunt irure aliquip ipsum. Voluptate ex dolore
                dolore nostrud quis non et deserunt. Minim elit mollit non et
                laborum exercitation cillum. Mollit sunt irure quis labore nulla
                ex.
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <h4 className="text-center">Staking pool supply</h4>
              <p
                style={{
                  fontSize: '4rem',
                }}
                className="text-center"
              >
                956K $
              </p>
            </div>
            <div className="col-md-4">
              <h4 className="text-center">APY %</h4>
              <p
                style={{
                  fontSize: '4rem',
                }}
                className="text-center"
              >
                31.4 %
              </p>
            </div>
            <div className="col-md-4">
              <h4 className="text-center">N° of stakers</h4>
              <p
                style={{
                  fontSize: '4rem',
                }}
                className="text-center"
              >
                3.1k
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <Section>
              <h4 className="text-center">My stake</h4>
              <p
                style={{
                  fontSize: '4rem',
                }}
                className="text-center"
              >
                0.00000000
                <img
                  src="https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/9d5/c43/cc-/9d5c43cc-e232-4267-aa8a-8c654a55db2d-1608222929-b90bbe4696613e2faeb17d48ac3aa7ba6a83674a.png"
                  width="80"
                />
              </p>
              <div class=" text-center mt-4">
                <Button
                  label="Stake"
                  className="p-button-rounded p-button-success mr-2"
                />{' '}
                <Button
                  label="Unstake"
                  className="p-button-rounded p-button-success mr-2"
                  style={{ backgroundColor: '#ffde00' }}
                  disabled={true}
                />
              </div>
            </Section>
          </div>
          <div className="col-md-6">
            <Section>
              <h4 className="text-center">My rewards</h4>
              <p
                style={{
                  fontSize: '4rem',
                }}
                className="text-center"
              >
                0.00000000
                <img
                  src="https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/9d5/c43/cc-/9d5c43cc-e232-4267-aa8a-8c654a55db2d-1608222929-b90bbe4696613e2faeb17d48ac3aa7ba6a83674a.png"
                  width="80"
                />
              </p>
              <div class=" text-center mt-4">
                <Button
                  label="Withdraw"
                  className="p-button-rounded p-button-success mr-2"
                />{' '}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  )
}

const Section = styled.section`
  background-color: black;
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  .title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .title {
    h1 {
      font-size: 2rem;
      letter-spacing: 0.2rem;
    }
  }
  .p-menuitem-link {
    :hover {
      .p-menuitem-text {
        color: #ffde00;
      }
      .p-menuitem-icon {
        color: #ffde00;
      }
    }
  }
`

export default StakingPoolPage
