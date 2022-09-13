import React from 'react'
import styled from 'styled-components'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'

const LineChart = () => {
  const data = [
    {
      data: 6780,
    },
    {
      data: 6680,
    },
    {
      data: 6500,
    },
    {
      data: 6300,
    },
    {
      data: 5900,
    },
    {
      data: 5700,
    },
    {
      data: 5500,
    },
    {
      data: 5300,
    },
    {
      data: 5100,
    },
    {
      data: 5090,
    },
    {
      data: 5300,
    },
    { data: 4500 },
    {
      data: 5000,
    },
    {
      data: 4700,
    },
    {
      data: 4400,
    },
    {
      data: 4800,
    },
    {
      data: 5300,
    },
    {
      data: 5800,
    },
    {
      data: 6000,
    },
    {
      data: 6300,
    },
    {
      data: 6580,
    },
    {
      data: 6500,
    },
    {
      data: 6300,
    },
    {
      data: 6500,
    },
    {
      data: 6700,
    },
    {
      data: 7000,
    },
    {
      data: 7300,
    },
    {
      data: 7500,
    },
    {
      data: 7700,
    },
    {
      data: 8090,
    },
    {
      data: 8190,
    },
    {
      data: 7990,
    },
    {
      data: 5800,
    },
    {
      data: 6000,
    },
    {
      data: 6300,
    },
    {
      data: 6780,
    },

    {
      data: 7700,
    },
    {
      data: 7500,
    },
    {
      data: 7300,
    },
    {
      data: 7000,
    },
    {
      data: 6700,
    },
    {
      data: 6500,
    },
    {
      data: 6300,
    },
    {
      data: 6500,
    },
    {
      data: 6780,
    },
    {
      data: 6300,
    },
    {
      data: 6000,
    },
    {
      data: 5800,
    },

    {
      data: 5490,
    },
    {
      data: 6000,
    },
    {
      data: 8000,
    },
  ]
  return (
    <div>
      <Section>
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#0aa515" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#000000ff" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="data"
                stroke="#0aa515"
                strokeWidth={2}
                fill="url(#colorview)"
                animationBegin={800}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </div>
  )
}

const Section = styled.section`
background-color: black;
border-radius: 1rem;
padding: 1rem;
height: 100%;
width: 100%;
color: white;
  width: 50%;
    .slider {
      .services {
        display: flex;
        gap: 1rem;
        .service {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
          min-width: 5rem;
          img {
            height: 2rem;
          }
        }
      }
    }
  }
  .chart {
    height: 3rem;
    .recharts-default-tooltip {
      background-color: var(--dark-background-color) !important;
      border: none !important;
      border-radius: 1rem;
      box-shadow: 0 0 60px 8px #0aa515;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    height: 100%;
    .title-container {
      flex-direction: column;
      gap: 0.5rem;
      .title {
        text-align: center;
      }
      .slider {
        .services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          .service {
            gap: 0.5rem;
            min-width: 1rem;
          }
        }
      }
    }
  }
`

export default LineChart
