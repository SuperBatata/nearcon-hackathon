import React, { useState, useEffect } from 'react'
import LineChart from '../../layouts/Reusables/LineChart'
import styled from 'styled-components'

// Primereact
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'

//React router dom
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'primereact/skeleton'

// Loading skeleton table
const skeletonTable = Array.from({ length: 5 })

const DaoList = ({ reload, setReload }) => {
  const navigate = useNavigate()
  const [daos, setDaos] = useState([])

  // Loading variables
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = () => {
      window.contract.get_all_daos().then((data) => {
        let shapedList = []
        data.forEach((element) => {
          shapedList.push({
            ...element,
            number_of_proposals: element.proposals.length,
          })
        })
        setDaos(shapedList)
        setIsLoading(false)
        setReload('no load')
      })
    }
    fetchData()
  }, [reload])

  const reusableStreamDisplay = () => {
    return (
      <>
        <LineChart />
      </>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          label="View"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            navigate(`${rowData.dao_name}/landing`)
          }}
        />
      </React.Fragment>
    )
  }

  const bodyTemplate = () => {
    return (
      <>
        <Skeleton></Skeleton>
      </>
    )
  }

  return (
    <Section>
      <div className="title-container">
        <div className="title">
          <h4>DAOs</h4>
        </div>
      </div>
      {!isLoading ? (
        <DataTable value={daos} responsiveLayout="scroll">
          <Column field="dao_name" header="Name"></Column>
          <Column field="numb_members" header="Members"></Column>
          <Column body={reusableStreamDisplay} header="Proposals"></Column>
          <Column
            field={'number_of_proposals'}
            header="N° of Proposals"
          ></Column>
          <Column header="" body={actionBodyTemplate}></Column>
        </DataTable>
      ) : (
        <DataTable value={skeletonTable}>
          <Column header="Title" body={bodyTemplate}></Column>
          <Column header="Votes for" body={bodyTemplate}></Column>
          <Column header="Votes against" body={bodyTemplate}></Column>
          <Column body={bodyTemplate}></Column>
        </DataTable>
      )}
    </Section>
  )
}

const Section = styled.section`
  background-color: black;
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  color: white;
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

export default DaoList
