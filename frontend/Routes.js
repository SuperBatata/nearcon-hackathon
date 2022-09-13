import React from 'react'
import { Route, Routes as R } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GovernancePage from './pages/GovernancePage'
import DaoPage from './pages/DaoPage'
import GovernancePage from './pages/GovernancePage'
import Proposals from './components/dao/proposals'
import Dashboards from './components/dao/dashboards'
import SwapPage from './pages/SwapPage'
import VotingPage from './pages/VotingPage'
import OnDevelopmentModPage from './pages/OnDevelopmentModPage'
import StakePage from './pages/StakePage'
import StakingPoolPage from './pages/StakingPoolPage'

const Routes = () => {
  return (
    <R>
      <Route exact path="/" element={<OnDevelopmentModPage />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/governance" element={<GovernancePage />} />
      <Route exact path="/swap" element={<SwapPage />} />
      <Route exact path="/stake" element={<StakePage />} />
      <Route exact path="/stake/:pool_name" element={<StakingPoolPage />} />
      <Route exact path="/governance/:dao_name" element={<DaoPage />}>
        <Route exact path="landing" element={<Dashboards />} />
        <Route exact path="proposals" element={<Proposals />} />
      </Route>
      <Route
        exact
        path="/voting/:dao_name/:proposal_name"
        element={<VotingPage />}
      />
      <Route path="*" element={<OnDevelopmentModPage />} />
    </R>
  )
}

export default Routes
