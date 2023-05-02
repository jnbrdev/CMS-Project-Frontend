import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilShieldAlt,
  cilDescription,
  cilSpeedometer,
  cilCalendarCheck,
  cilMoney,
  cilPool,
  cilHouse,
  cilUser,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  /*{
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },*/
  {
    component: CNavTitle,
    name: 'Features',
  },

  {
    component: CNavGroup,
    name: 'Billings',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Water Bill List',
        to: '/waterbilllist',
      },
      {
        component: CNavItem,
        name: 'Association Due List',
        to: '/assocduelist',
      },
      {
        component: CNavItem,
        name: 'Manage Billings',
        to: '/managebilling',
      },
      {
        component: CNavItem,
        name: 'Add Bill',
        to: '/addbill',
      },
      {
        component: CNavItem,
        name: 'Main Invoice',
        to: '/maininvoice',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Requests',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Visit Request',
        to: '/requestlist'
      },
      {
        component: CNavItem,
        name: 'Pull-Out Request',
        to: '/pullout',
      },
      {
        component: CNavItem,
        name: 'Access Permit',
        to: '/accesspermit',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Services',
    to: '/servicelist',
    icon: <CIcon icon={cilPool} customClassName="nav-icon" />,
  },
  /*{
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },*/
  {
    component: CNavItem,
    name: 'Units',
    to: '/unitlist',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/userlist',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Admin Management',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admin List',
        to: '/adminlist',
      },
      {
        component: CNavItem,
        name: 'Add Admin User',
        to: '/addadmin',
      },
      {
        component: CNavItem,
        name: 'Admin Privileges',
        to: '/adminprivileges',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Guest',
    to: '/guestlist',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Calendar Reminders',
    to: '/calendarreminders',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },

  /*{ // ForReference
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },*/

]

export default _nav
