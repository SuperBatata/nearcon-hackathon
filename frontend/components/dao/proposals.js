import React, { useEffect, useState } from 'react'

// Routing imports
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// Styled components
import styled from 'styled-components'

//React Icons
import { FaHotjar } from 'react-icons/fa'
import { RiTempColdLine } from 'react-icons/ri'

//Primreact
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Skeleton } from 'primereact/skeleton'
import { ProgressSpinner } from 'primereact/progressspinner'
import { ProgressBar } from 'primereact/progressbar'
import { Tooltip } from 'primereact/tooltip'

//Date Formatting tools
import { addMinutes } from '../../utils/timeConverter'
import moment from 'moment'

// Loading skeleton table
const skeletonTable = Array.from({ length: 5 })

const Proposals = () => {
  const navigate = useNavigate()
  const { dao_name } = useParams()

  // Send the signal to child route components to reload the table
  const [reload, setReload] = useOutletContext()

  // Loading variables
  const [isLoading, setIsLoading] = useState(false)

  //List of proposals
  const [proposals, setProposals] = useState(null)

  // Filters
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  })

  // Selection variables
  const [selectedProposal, setSelectedProposal] = useState(null)

  //Dialog props
  const [displayMaximizable, setDisplayMaximizable] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    window.contract
      .get_all_proposals({
        dao_name: dao_name,
      })
      .then((data) => {
        let shapedList = []
        data.forEach((element) => {
          shapedList.push({
            ...element,
            date_creation: moment(
              new Date(element.time_of_creation / 1000000),
            ).format('MMMM Do YYYY, h:mm:ss a'),
            deadline: addMinutes(
              element.duration_days * 24 * 60 +
                element.duration_hours * 60 +
                element.duration_min,
              new Date(element.time_of_creation / 1000000),
            ),
            formattedDeadline: moment(
              new Date(element.time_of_creation / 1000000),
            )
              .add(element.duration_days, 'days')
              .calendar(),
            vote_is_expired:
              new Date() >
              addMinutes(
                element.duration_days * 24 * 60 +
                  element.duration_hours * 60 +
                  element.duration_min,
                new Date(element.time_of_creation / 1000000),
              ),
            votes_for_percentage: isNaN(
              element.votes_for / (element.votes_for + element.votes_against),
            )
              ? -1
              : element.votes_for / (element.votes_for + element.votes_against),
          })
        })
        console.log(shapedList)
        setIsLoading(false)
        setProposals(shapedList)
        setReload('no load')
      })
      .catch((err) => {
        setIsLoading(false)
        console.log('Oops something went wrong', err)
      })
  }, [reload])

  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
  }

  const dialogFuncMap = {
    displayMaximizable: setDisplayMaximizable,
  }

  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value
    let filters = { ...filtersMap[filtersKey].value }
    filters['global'].value = value

    filtersMap[filtersKey].callback(filters)
  }

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[`${filtersKey}`].value
    const value = filters['global'] ? filters['global'].value : ''
    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={value || ''}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder="Global Search"
        />
      </span>
    )
  }

  const onClick = (name, rowData) => {
    dialogFuncMap[`${name}`](true)
    setSelectedProposal(rowData)
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false)
  }

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label={selectedProposal?.vote_is_expired ? 'More' : 'Vote'}
          icon={
            selectedProposal?.vote_is_expired ? 'pi pi-plus' : 'pi pi-check'
          }
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    )
  }

  const liveBodyTemplate = (rowData) => {
    return (
      <>
        {!rowData.vote_is_expired ? (
          <Button
            label="Live"
            className="p-button-rounded p-button-success mr-2 button-live"
            disabled
            style={{ color: 'white' }}
          />
        ) : (
          <></>
        )}
      </>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <Button
                label="View"
                className="btn p-button-success mr-2"
                onClick={() => {
                  onClick('displayMaximizable', rowData)
                }}
              />
            </div>
            <div className="col-md-4">
              <Link
                to={`/voting/${dao_name}/${rowData.proposal_name}`}
                className="btn p-button-warning"
                style={{ backgroundColor: '#ffde00', color: 'black' }}
              >
                {' '}
                {rowData.vote_is_expired ? 'More' : 'Vote'}
              </Link>

              {/* <>
                  <ProgressSpinner
                    style={{ width: '50px', height: '50px' }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </> */}
            </div>
          </div>
        </div>
        &nbsp;
      </React.Fragment>
    )
  }

  const header1 = renderHeader('filters1')

  const bodyTemplate = () => {
    return (
      <>
        <Skeleton></Skeleton>
      </>
    )
  }

  return (
    <Section className="mt-4">
      <div className="title-container">
        <div className="title">
          <h4>Proposals</h4>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-12">
          <ProfileContainer>
            <div>
              {!isLoading ? (
                <DataTable
                  value={proposals}
                  paginator
                  rows={10}
                  header={header1}
                  filters={filters1}
                  onFilter={(e) => setFilters1(e.filters)}
                  selection={selectedProposal}
                  onSelectionChange={(e) => setSelectedProposal(e.value)}
                  dataKey="id"
                  responsiveLayout="scroll"
                  stateStorage="session"
                  stateKey="dt-state-demo-session"
                  emptyMessage={'No proposals'}
                  className="buttonDisabled"
                >
                  <Column
                    field="proposal_name"
                    header="Title"
                    sortable
                    filter
                    filterPlaceholder="Search by title"
                  ></Column>
                  <Column
                    field="votes_for"
                    header="Votes for"
                    sortable
                  ></Column>
                  <Column
                    field="votes_against"
                    header="Votes against"
                    sortable
                  ></Column>
                  <Column
                    field="formattedDeadline"
                    header="Deadline"
                    sortable
                  ></Column>
                  <Column header="" body={actionBodyTemplate}></Column>
                  <Column
                    field="vote_is_expired"
                    header=""
                    body={liveBodyTemplate}
                  ></Column>
                </DataTable>
              ) : (
                <DataTable value={skeletonTable} header={header1}>
                  <Column header="Title" body={bodyTemplate}></Column>
                  <Column header="Votes for" body={bodyTemplate}></Column>
                  <Column header="Votes against" body={bodyTemplate}></Column>
                  <Column body={bodyTemplate}></Column>
                </DataTable>
              )}
            </div>
            <Dialog
              header={selectedProposal?.proposal_name}
              visible={displayMaximizable}
              maximizable
              modal
              style={{ width: '50vw' }}
              footer={renderFooter('displayMaximizable')}
              onHide={() => onHide('displayMaximizable')}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <h6 style={{ opacity: '50%' }}>Proposer :</h6>
                    <p className="m-0">{selectedProposal?.proposal_creator}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 style={{ opacity: '50%' }}>DAO name :</h6>
                    <p className="m-0">{dao_name}</p>
                  </div>
                  <div className="col-md-12 mt-4">
                    <h6 style={{ opacity: '50%' }}>Description :</h6>
                    <p className="m-0">{selectedProposal?.description}</p>
                  </div>

                  <div className="col-md-12 mt-4">
                    <Tooltip target=".Not" mouseTrack mouseTrackLeft={10} />
                    <p
                      className="Not"
                      data-pr-tooltip="Not"
                      style={{ float: 'right', margin: '5px' }}
                    >
                      <IconContainerNot>
                        <RiTempColdLine className="mb-4" />
                      </IconContainerNot>
                    </p>
                    <Tooltip target=".Hot" mouseTrack mouseTrackLeft={10} />
                    <p
                      className="Hot"
                      data-pr-tooltip="Hot"
                      style={{ float: 'left', margin: '5px' }}
                    >
                      <IconContainerHot>
                        <FaHotjar className="mb-4" />
                      </IconContainerHot>
                    </p>
                  </div>

                  <div className="col-md-12">
                    {selectedProposal?.votes_for_percentage > 0 ? (
                      <ProgressBar
                        value={
                          selectedProposal?.votes_for_percentage > 0
                            ? selectedProposal?.votes_for_percentage * 100
                            : 0
                        }
                        showValue={false}
                      />
                    ) : (
                      <p className="text-center mt-4">
                        Voting didn't started yet
                      </p>
                    )}
                  </div>
                  <div className="col-md-12 mt-4">
                    <h6 className="text-center" style={{ opacity: '50%' }}>
                      Deadline :
                    </h6>

                    <p className="text-center">
                      {selectedProposal?.formattedDeadline}
                    </p>
                  </div>
                </div>
              </div>
            </Dialog>
          </ProfileContainer>
        </div>
      </div>
    </Section>
  )
}
const ProfileContainer = styled.div``
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
export const IconContainerNot = styled.span`
  transition: 0.5s ease-in-out;
  :hover {
    svg {
      color: #ffde00;
    }
  }
`

export const IconContainerHot = styled.span`
  color: #ffde00;
  transition: 0.5s ease-in-out;
  :hover {
    svg {
      color: grey;
    }
  }
`
export default Proposals
