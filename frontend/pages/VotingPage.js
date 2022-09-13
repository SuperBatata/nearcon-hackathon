import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '../components/shared/Loading/loading'
import { login } from '../utils'
import Swal from 'sweetalert2'

//Primreact
import { Chart } from 'primereact/chart'
import { useParams } from 'react-router-dom'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'

const VotingPage = () => {
  const { dao_name, proposal_name } = useParams()
  const [currentProposal, setCurrentProposal] = useState(null)

  const [proposalIsLoading, setProposalIsLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAgainst, setIsLoadingAgainst] = useState(false)

  const [chartData, setChartData] = useState({})

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  })

  const fetchCurrentProposal = () => {
    window.contract
      .get_proposal({
        dao_name: dao_name,
        proposal_name: proposal_name,
      })
      .then((proposal) => {
        setProposalIsLoading(false)
        console.log(proposal)
        setCurrentProposal(proposal)
        setChartData({
          labels: ['Voted for', 'Voted Against'],
          datasets: [
            {
              data: [proposal?.votes_for, proposal?.votes_against],
              backgroundColor: ['#ffde00', 'black'],
              hoverBackgroundColor: ['#cdb200', 'grey'],
            },
          ],
        })
      })
  }

  useEffect(() => {
    setProposalIsLoading(true)
    fetchCurrentProposal()
  }, [])

  const items = [{ label: `Voting on ${proposal_name}` }]

  const home = {
    icon: 'pi pi-home',
    url: '/',
  }

  return (
    <>
      <Section>
        <BreadCrumb model={items} home={home} />
      </Section>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <Section>
              <div className="title-container">
                <div className="title">
                  <h4>Voting results</h4>
                </div>
              </div>
              {!proposalIsLoading ? (
                <span className="text-center mt-4">
                  <Chart
                    type="doughnut"
                    data={chartData}
                    options={lightOptions}
                    style={{ width: '90%' }}
                  />
                </span>
              ) : (
                <></>
              )}
            </Section>
          </div>
          <div className="col-md-4">
            <Section>
              <span className="text-center mt-4">
                {!currentProposal?.list_voters.includes(window.accountId) ? (
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <Button
                        label="Vote for"
                        icon="pi pi-check"
                        
                        loading={isLoading}
                        onClick={() => {
                          if (window.walletConnection.isSignedIn()) {
                            setIsLoading(true)
                            window.contract
                              .add_vote({
                                dao_name: dao_name,
                                proposal_name: proposal_name,
                                vote: 1,
                              })
                              .then(() => {
                                console.log('vote added')
                                Swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title:
                                    'Your vote has been added successfully',
                                  showConfirmButton: false,
                                  background: 'black',
                                  iconColor: '#ffde00',
                                  confirmButtonColor: 'grey',
                                  timer: 2500,
                                })
                                setIsLoading(false)
                                fetchCurrentProposal()
                              })
                              .catch((err) => {
                                console.error(
                                  'Oops something went wrong !',
                                  err,
                                )
                                setIsLoading(false)
                                fetchCurrentProposal()
                              })
                          } else {
                            login()
                          }
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <Button
                        label="Vote against"
                        icon="pi pi-times"
                        loading={isLoadingAgainst}
                        onClick={() => {
                          if (window.walletConnection.isSignedIn()) {
                            setIsLoadingAgainst(true)
                            window.contract
                              .add_vote({
                                dao_name: dao_name,
                                proposal_name: proposal_name,
                                vote: 0,
                              })
                              .then(() => {
                                console.log('vote added')
                                setIsLoadingAgainst(false)
                                fetchCurrentProposal()
                                Swal.fire({
                                  position: 'top-end',
                                  icon: 'success',
                                  title:
                                    'Your vote has been added successfully',
                                  showConfirmButton: false,
                                  background: 'black',
                                  iconColor: '#ffde00',
                                  confirmButtonColor: 'grey',
                                  timer: 2500,
                                })
                              })
                              .catch((err) => {
                                console.error(
                                  'Oops something went wrong !',
                                  err,
                                )
                                setIsLoadingAgainst(false)
                                fetchCurrentProposal()
                              })
                          } else {
                            login()
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div> Thank you for voting! </div>
                )}
              </span>
            </Section>
          </div>
          <div className="col-md-4">
            <Section>
              <div className="title-container">
                <div className="title">
                  <h4></h4>
                </div>
              </div>
              <div
                className="text-center mt-4"
                style={{ paddingLeft: '28%', paddingTop: '15%' }}
              >
                <Loading />
              </div>
            </Section>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Section className="mt-4"></Section>
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

export default VotingPage
