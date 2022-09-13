import React from 'react'
import styled from 'styled-components'

import { Card } from 'primereact/card'

import { v } from '../styles/variables'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'

const SwapPage = () => {
  const header = (
    <img
      alt="Card"
      src="https://global.discourse-cdn.com/standard17/uploads/ref_finance/original/1X/64017832ba00463abe25fb22ff922d59a244792f.png"
      onError={(e) =>
        (e.target.src =
          'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      }
    />
  )
  const footer = (
    <span className="text-center">
      <Button label="Save" icon="pi pi-check" />
    </span>
  )

  const items = [{ label: 'Swapping' }]

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
          <div className="title-container">
            <div className="title">
              <h4>DEX's</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Card style={{ width: '14em' }} header={header}>
                <div className="text-center">
                  <Button
                    onClick={() =>
                      window.open(
                        'https://testnet.ref.finance/#usdn.testnet|usdt.fakes.testnet',
                        '_blank',
                      )
                    }
                    label="Swap"
                    icon="pi pi-arrows-h"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
      <Section className="mt-4">
        <div className="container">
          <div className="title-container">
            <div className="title">
              <h4>CEX's</h4>
            </div>
          </div>
        </div>
      </Section>
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

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;
  svg {
    font-size: 10rem;
  }
`

export default SwapPage
