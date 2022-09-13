import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React, { useState } from 'react'
import styled from 'styled-components'
import Loading from '../components/shared/Loading/loading'
import { InputNumber } from 'primereact/inputnumber'
import Loader2 from '../components/shared/Loading/loader2'
import { useNavigate } from 'react-router-dom'
import { BreadCrumb } from 'primereact/breadcrumb'

const StakePage = () => {
  const navigate = useNavigate()

  const [loader, setLoader] = useState(false)
  const [displayBasic, setDisplayBasic] = useState(false)

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  }

  const formik = useFormik({
    initialValues: {
      stake: '',
    },
    onSubmit: (data) => {
      setLoader(true)
      window.stake
        .stake({ amount: parseInt(data.stake) })
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You stacked successfully',
            showConfirmButton: false,
            background: 'black',
            iconColor: '#ffde00',
            confirmButtonColor: 'grey',
            timer: 2500,
          })
          setLoader(false)
          onHide('displayBasic')
        })
        .catch((err) => {
          console.error('Oops something went wrong !', err)
          setLoader(false)
        })
      formik.resetForm()
    },
  })

  let stakingPools = [
    {
      name: 'Thunder',
      logo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Bitcoin_lightning_logo.svg/1200px-Bitcoin_lightning_logo.svg.png',
      liquidity: 320,
      APY: 31.4,
      reward: 0.4,
    },
  ]

  const logoTemplate = (rowData) => {
    return (
      <>
        <img src={rowData.logo} width="30" />
        &nbsp;
        {rowData.name}
      </>
    )
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false)
  }

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          label="Stake"
          className="p-button-rounded mr-2"
          style={{ backgroundColor: '#ffde00' }}
          onClick={() => onClick('displayBasic')}
        />
        &nbsp;
        <Button
          label="Check reward"
          className="p-button-rounded p-button-success mr-2"
        />
      </React.Fragment>
    )
  }

  const items = [{ label: `Staking` }]

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
          <div className="col-md-3">
            <Section>
              <div className="title-container">
                <div className="title">
                  <h4>Total staked amount :</h4>
                </div>
              </div>
              <p
                style={{
                  fontSize: '4rem',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  letterSpacing: '.1rem',
                  lineHeight: '2rem',
                  marginTop: '2.5rem',
                }}
                className="text-center"
              >
                0.00 $
              </p>
            </Section>
          </div>
          <div className="col-md-3">
            <Section>
              <div className="title-container">
                <div className="title">
                  <h4>Total reward:</h4>
                </div>
              </div>
              <p
                style={{
                  fontSize: '4rem',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  letterSpacing: '.1rem',
                  lineHeight: '2rem',
                  marginTop: '2.5rem',
                }}
                className="text-center"
              >
                0.00 $
              </p>
            </Section>
          </div>
          <div className="col-md-3">
            <Section>
              <div style={{ paddingLeft: '3.2rem' }}>
                <Loading />
              </div>
            </Section>
          </div>
          <div className="col-md-3">
            <Section>
              <div style={{ paddingLeft: '3.2rem' }}>
                <Loading />
              </div>
            </Section>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <Section>
              <DataTable
                value={stakingPools}
                selectionMode="single"
                responsiveLayout="scroll"
                onSelectionChange={(e) => navigate(`/stake/${e.value.name}`)}
              >
                <Column header="Name" body={logoTemplate}></Column>
                <Column field="liquidity" header="Liquidity"></Column>
                <Column field="APY" header="APY %"></Column>
                <Column field="reward" header="Reward"></Column>
                <Column header="" body={actionBodyTemplate}></Column>
              </DataTable>
            </Section>
          </div>
        </div>
      </div>

      <Dialog
        header="Staking"
        visible={displayBasic}
        style={{ width: '50vw' }}
        onHide={() => onHide('displayBasic')}
      >
        {!loader ? (
          <div className="container mt-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="p-inputgroup">
                    <InputText
                      id="stake"
                      value={formik.values.stake}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      tooltip="Enter the amount that you want to stake"
                      tooltipOptions={{
                        position: 'bottom',
                        mouseTrack: true,
                        mouseTrackTop: 15,
                      }}
                      placeholder="Staked amount"
                    />
                    <span className="p-inputgroup-addon">NEAR</span>
                  </div>
                </div>
              </div>
              <div
                className="mt-4"
                style={{ display: 'flex', justifyContent: 'right' }}
              >
                <Button
                  label="No"
                  icon="pi pi-times"
                  onClick={() => onHide('displayBasic')}
                  className="p-button-text"
                />
                <Button
                  label="Stake"
                  icon="pi pi-check"
                  type="submit"
                  autoFocus
                />
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <Loader2 />
          </div>
        )}
      </Dialog>
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

export default StakePage
