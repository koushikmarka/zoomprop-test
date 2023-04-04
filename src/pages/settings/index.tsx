// @ts-nocheck
import ApiAccess from './api'
import Users from './users'
import GlobalContext from '@/context/GlobalContext'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Grid, Tabs, Tab } from '@mui/material'
import React, { useContext, useState } from 'react'

const Settings = () => {
  const gContext = useContext<any>(GlobalContext)
  const user = gContext.user
  gContext.setCurrentPage('Settings')
  let [show, setShow] = useState<any>(false)
  const [tabValue, setTabValue] = useState<any>('1')
  const [message, setMessage] = useState<any>(null)
  const permissions = gContext?.user?.permissions
  const token = user.authToken

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Main
      meta={
        <Meta
          title="Zoomprop | Next level real estate data"
          description="description"
        />
      }
      user={user}
    >
      <TabContext value={tabValue}>
        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
          <Tab label="Users" value="1" />
          {/* <Tab label="Item Two" value="2" /> */}
        </TabList>
        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            aria-label="Settings Tabs"
            TabIndicatorProps={{
              style: {
                display: 'none',
              },
            }}
          >
            {/* <TabPanel value="2">
              <ApiAccess setMessage={setMessage} setShow={setShow} />
            </TabPanel> */}
            <TabPanel value="1" sx={{ width: '100%', px: 0 }}>
              <Users permissions={permissions} token={token} />
            </TabPanel>
          </Tabs>
        </Grid>
      </TabContext>
    </Main>
    // <ToastContainer>
    //   <Toast
    //     onClose={() => setShow(false)}
    //     show={show}
    //     delay={3000}
    //     bg="dark"
    //     autohide>
    //     <Toast.Body>
    //       <svg
    //         style={{ marginRight: 15 }}
    //         width="26"
    //         height="26"
    //         viewBox="0 0 26 26"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg">
    //         <path
    //           d="M13.0001 25.1262C19.6951 25.1262 25.1262 19.6951 25.1262 13.0001C25.1262 6.30513 19.6951 0.874023 13.0001 0.874023C6.30513 0.874023 0.874023 6.30513 0.874023 13.0001C0.874023 19.6951 6.30513 25.1262 13.0001 25.1262ZM9.75013 9.20847H16.6112V7.76402C16.6112 7.64125 16.6762 7.52569 16.7846 7.45347C16.8929 7.38847 17.0229 7.38125 17.1385 7.43902L20.7496 9.24458C20.8724 9.30236 20.9518 9.43236 20.9518 9.56958C20.9518 9.7068 20.8724 9.82958 20.7496 9.89458L17.1385 11.7001C17.0229 11.7579 16.8929 11.7507 16.7846 11.6857C16.6762 11.6135 16.6112 11.4979 16.6112 11.3751V9.93069H9.75013C7.5618 9.93069 5.77791 11.7146 5.77791 13.9029C5.77791 16.0912 7.5618 17.8751 9.75013 17.8751H14.0835C14.2857 17.8751 14.4446 18.034 14.4446 18.2362C14.4446 18.4385 14.2857 18.5974 14.0835 18.5974H9.75013C7.16458 18.5974 5.05569 16.4885 5.05569 13.9029C5.05569 11.3174 7.16458 9.20847 9.75013 9.20847Z"
    //           fill="#3AB67A"
    //         />
    //       </svg>

    //       <b>{message ? message : "message"}</b>
    //     </Toast.Body>
    //   </Toast>
    // </ToastContainer>
  )
}
export default Settings
