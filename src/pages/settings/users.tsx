import MainCard from '@/components/Cards/ui/MainCard'
// import UserList from '@/components/List/UserList'
import { signUpStandard, getUsers, updateUser } from '@/services'
import { checkPermissions } from '@/utils'
import {
  Button,
  Modal,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useState, useEffect } from 'react'

export type UsersProps = {
  formDetails?: any
  permissions?: any
  token?: any
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Users = ({ formDetails, permissions, token }: UsersProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const [toggleUserModal, setToggleUserModal] = useState<boolean>(false)
  const [userToEdit, setUserToEdit] = useState<any>({})
  const [userCreateAdmin, setUserCreateAdmin] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({})
  const [isAdmin, setIsAdmin] = useState<any>(false)
  const [orgUsers, setOrgUsers] = useState<any>()
  const [baseUrl, setBaseUrl] = useState<any>()

  useEffect(() => {
    setBaseUrl(window.location.origin)

    getUsers(token).then((res) => {
      if (res) {
        setOrgUsers(res.users)
      }
    })
  }, [])

  // const deleteUser = (id: number) => {
  //   alert(id);
  // };

  const onFormChange = (event: any, type: any) => {
    const obj = {
      ...formData,
      [type]: event.target.value,
    }

    setFormData(obj)
  }

  const submitFormData = () => {
    setToggleUserModal(!toggleUserModal)
    let data = formData
    data.baseUrl = baseUrl
    if (userCreateAdmin) {
      data.orgAdmin = true
      setUserCreateAdmin(false)
      if (!data.usagePlan) {
        data.usagePlan = 'basic'
      }
    }
    if (isAdmin) {
      data.orgAdmin = true
      setIsAdmin(false)
    }

    if (userToEdit) {
      updateUser(token, data).then((res) => {
        console.log('this is res', res)
      })
      enqueueSnackbar(`${data.firstName} has successfully been updated!`, {
        variant: 'success',
        autoHideDuration: 3000,
      })
    } else {
      signUpStandard(token, data).then((res) => {
        console.log('this is res', res)
      })
    }
  }

  useEffect(() => {
    if (!toggleUserModal) {
      setUserCreateAdmin(false)
    }
  }, [toggleUserModal])

  const userModal = (user: any) => {
    setToggleUserModal(!toggleUserModal)
    setFormData(user)
    setUserToEdit(user)
  }

  return (
    <>
      <MainCard
        title={
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h3">Users</Typography>
            </Grid>
            <Box>
              <Grid item>
                <Button
                  onClick={() => userModal(null)}
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  <i className="fa fa-plus-circle mr-2 success" />
                  Add User
                </Button>
                {permissions && checkPermissions(permissions, 'zoompropAdmin') && (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setUserCreateAdmin(true), userModal(null)
                    }}
                    className="ml-md-4 "
                  >
                    <i className="fa fa-plus-circle mr-2 success" />
                    Create Admin User
                  </Button>
                )}
              </Grid>
            </Box>
          </Grid>
        }
        content={false}
      >
        <Grid item xs={12} sx={{ p: 3 }}>
          {orgUsers ? (
            // <UserList userModal={userModal} users={orgUsers} />
            <></>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </MainCard>

      <Modal
        open={toggleUserModal}
        onClose={() => setToggleUserModal(!toggleUserModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <InputLabel sx={{ mb: 1 }}>First Name</InputLabel>
              <TextField
                fullWidth
                placeholder="Enter first name"
                onChange={(e: any) => onFormChange(e, 'firstName')}
                name={formDetails?.firstName}
                value={formData?.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ mb: 1 }}>Last Name</InputLabel>
              <TextField
                fullWidth
                placeholder="Enter last name"
                onChange={(e: any) => onFormChange(e, 'lastName')}
                name={formDetails?.lastName}
                value={formData?.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
              <TextField
                onChange={(e: any) => onFormChange(e, 'email')}
                name={formDetails?.email}
                value={formData?.email}
                fullWidth
                placeholder="Enter email"
              />
            </Grid>
            {userCreateAdmin ? (
              <>
                <Grid item xs={12}>
                  <InputLabel>Org name</InputLabel>
                  <TextField
                    name={formDetails?.orgName}
                    value={formData?.orgName}
                    type="orgName"
                    onChange={(e: any) => onFormChange(e, 'orgName')}
                    fullWidth
                    placeholder="Enter org name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Usage plan</InputLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="basic" />
                    <FormControlLabel control={<Checkbox />} label="premium" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="enterprise"
                    />
                  </FormGroup>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <InputLabel>Is admin</InputLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={formData?.orgAdmin} />}
                    value={formData?.orgAdmin}
                    label=""
                    onClick={(e) => {
                      setIsAdmin((e.target as HTMLInputElement).checked)
                    }}
                  />
                </FormGroup>
              </Grid>
            )}
            <Grid item xs={12}>
              {userToEdit != null ? (
                <Button
                  variant="contained"
                  sx={{ width: '100%', height: '50px' }}
                  onClick={submitFormData}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={submitFormData}
                  sx={{ width: '100%', height: '50px' }}
                >
                  Create user
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
export default Users
