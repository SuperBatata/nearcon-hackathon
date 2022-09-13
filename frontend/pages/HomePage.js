import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// React icons
import { VscOrganization } from 'react-icons/vsc'
import { BsSafe2 } from 'react-icons/bs'
import { AiOutlineLineChart } from 'react-icons/ai'
import { GiReceiveMoney, GiGreenPower } from 'react-icons/gi'

import { Carousel } from 'primereact/carousel'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  useEffect(() => {
    let data = [
      {
        title: 'LightencyDAO',
        icon: <VscOrganization size={100} />,
        paragraph:
          'Is the governance engine.Every pool of liquidity is governed by a dedicated DAO. Participators can be Council members or community member. A community member is Light holder that own Light token and hold it in one of Lightency staking contracts. He can participate in the treasury governance.',
      },
      {
        title: 'Treasury',
        icon: <BsSafe2 size={100} />,
        paragraph:
          'Its Lightency main liquidity contracts. Its role is to support Lightency development. It decides what energy projects to invest in. It decides which pool should be  filled and when before interacting with the Bonding Curve.',
      },
      {
        title: 'Bonding Curve',
        icon: <AiOutlineLineChart size={100} />,
        paragraph:
          'Its role is minting and burning Light tokens when a user uses the function buy or sell. It converts the received assets to stable coins before minting new Light tokens. Maintain Light token price. In critical situations, Lightency council and community members can decide to suspend it.',
      },
      {
        title: 'Staking Pool',
        icon: <GiReceiveMoney size={100} />,
        paragraph:
          'Igoverned by the treadury, it is a group of different lockup periods contracts, It will reward the stakers for their stakings. Lightency  profits will be injected in this pool. Also It can be filled by new tokens . ',
      },
      {
        title: 'Energy Fund',
        icon: <GiGreenPower size={100} />,
        paragraph:
          'Energy investors invests in Green energy projects here. they swap their assets ( Crypto/fiat ) to Light tokens and become part of Lightency DAO members.It is Governed by the treasury, this contract  interacts with the bonding curve to buy new tokens. ',
      },
    ]
    setProducts(data.slice(0, 9))
  }, [])

  const productTemplate = (product) => {
    return (
      <div className="product-item">
        <div className="product-item-content mt-4">
          <span className="mb-3 text-center">
            <SLinkContainer style={{ color: '#ffde00' }}>
              {product.icon}
            </SLinkContainer>
          </span>
          <div>
            <h4 className="mb-4 mt-4 text-center">{product.title}</h4>
            <p
              style={{
                fontSize: '.8rem',
                paddingLeft: '10%',
                paddingRight: '10%',
                letterSpacing: '.1rem',
                lineHeight: '2rem',
                marginTop: '2.5rem'
              }}
            >
              {product.paragraph}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Section>
      <div className="carousel-demo">
        <div className="container">
          <Carousel
            className="mb-4"
            value={products}
            numVisible={3}
            numScroll={3}
            responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
          />
        </div>
      </div>
    </Section>
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
  .grid-item {
  }
`

export const SLinkContainer = styled.div`
  :hover {
    svg {
      color: #ffde00;
      box-shadow: 0 0 10px 1px #ffde00;
    }
    p {
      color: #ffde00;
    }
  }
`
export default HomePage
