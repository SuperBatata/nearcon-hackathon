import React, { useContext, useRef, useState } from 'react'
import { logoPNG } from '../../../assets/img'
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSearch,
  SSearchIcon,
  SSidebar,
  SSidebarButton,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb,
} from './styles'
import { ThemeContext } from '../../../App'
import { useLocation } from 'react-router-dom'

// Icons
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLeft,
  AiFillSetting,
  AiOutlineSwap,
} from 'react-icons/ai'
import { VscOrganization } from 'react-icons/vsc'
import { GrStackOverflow } from 'react-icons/gr'
import { MdLogout, MdOutlineOutbond } from 'react-icons/md'

const Sidebar = () => {
  const searchRef = useRef(null)
  const { setTheme, theme } = useContext(ThemeContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  const searchClickHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true)
      searchRef.current.focus()
    } else {
      // search functionality
    }
  }
  return (
    <div>
      <SSidebar>
        <>
          <SSidebarButton
            isOpen={sidebarOpen}
            onClick={() => setSidebarOpen((p) => !p)}
          >
            <AiOutlineLeft />
          </SSidebarButton>
        </>
        <SLogo>
          <img src={logoPNG} alt="Logo" />
        </SLogo>
        <SSearch
          onClick={searchClickHandler}
          style={!sidebarOpen ? { width: `fit-content` } : {}}
        >
          <SSearchIcon>
            <AiOutlineSearch />
          </SSearchIcon>
          <input
            ref={searchRef}
            placeholder="Search"
            style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
          />
        </SSearch>
        <SDivider />
        {linksArray.map(({ icon, label, notification, to }) => (
          <SLinkContainer
            key={label}
            className="selected"
            isActive={pathname === to}
          >
            <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <>
                  <SLinkLabel>
                    <p style={{ marginBottom: 0 }}>{label}</p>
                  </SLinkLabel>
                  {/* if notifications are at 0 or null, do not display */}
                  {!!notification && (
                    <SLinkNotification>{notification}</SLinkNotification>
                  )}
                </>
              )}
            </SLink>
          </SLinkContainer>
        ))}
        <SDivider />
        {secondaryLinkArray.map(({ icon, label }) => (
          <SLinkContainer key={label}>
            <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
              <SLinkIcon>{icon}</SLinkIcon>
              {sidebarOpen && (
                <SLinkLabel>
                  {' '}
                  <p style={{ marginBottom: 0 }}>{label}</p>
                </SLinkLabel>
              )}
            </SLink>
          </SLinkContainer>
        ))}
        <SDivider />
        <STheme>
          {/* {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
          <SThemeToggler
            isActive={theme === 'dark'}
            onClick={() => setTheme((p) => (p === 'light' ? 'dark' : 'light'))}
          >
            <SToggleThumb style={theme === 'dark' ? { right: '1px' } : {}} />
          </SThemeToggler> */}
        </STheme>
      </SSidebar>{' '}
    </div>
  )
}

const linksArray = [
  {
    label: 'Home',
    icon: <AiOutlineHome />,
    to: '/home',
    notification: 0,
  },
  {
    label: 'Governance',
    icon: <VscOrganization />,
    to: '/governance',
    notification: 0,
  },
  {
    label: 'Swap',
    icon: <AiOutlineSwap />,
    to: '/swap',
    notification: 0,
  },
  {
    label: 'Stake',
    icon: <GrStackOverflow />,
    to: '/stake',
    notification: 0,
  },
  {
    label: 'Bond',
    icon: <MdOutlineOutbond />,
    to: '/bond',
    notification: 0,
  },
]

const secondaryLinkArray = [
  {
    label: 'Settings',
    icon: <AiFillSetting />,
  },
  {
    label: 'Logout',
    icon: <MdLogout />,
  },
]
export default Sidebar
