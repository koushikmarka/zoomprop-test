import styled from 'styled-components'

export const ApiKeyContainer = styled.div`
  background: #2a2a2a;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 200px;
    font-size: 0.74rem !important;
    background: #0e1b2a;
    padding: 10px;
  }
`

export const SettingsContainer = styled.div`
  .tab-content,
  .nav-tabs {
    width: 100%;
  }

  .tab-content {
    margin-top: 10px;
  }

  .nav-tabs {
    border-bottom: none;
  }

  .nav-item a {
    border: none;
    padding: 5px 15px;
    margin: 5px;
    cursor: pointer;

    border-radius: 2px;
    color: ${({ theme }) => theme.colors.dfontcolor} !important;
    background: none;
    border: none !important;
    &.active,
    &:hover {
      color: ${({ theme }) => theme.colors.purple} !important;
      background-color: ${({ theme }) => theme.colors.purplemid} !important;
    }
  }

  .toast-container {
    position: fixed;
    bottom: 40px;
    left: 40px;
    z-index: 99999;
  }
`

export const UserTableContainer = styled.div`
  @media (max-width: 1300px) {
    button {
      min-width: 100% !important;
      display: block;
    }
  }

  .list-group {
    color: #fff;
    margin-top: 20px;
    padding: 0 25px;
    width: 100%;
  }

  .user-modal {
    label {
      color: #fff;
    }
  }

  button {
    min-width: auto;
    height: auto;
  }
  .table.table-dark {
    background: ${({ theme }) => theme.colors.purplemid} !important;
    color: #fff !important;
    thead {
      tr {
        &:hover {
          background: ${({ theme }) => theme.colors.purplemid} !important;
          th {
            color: #fff !important;
          }
        }
        th {
          color: #fff !important;
        }
      }
    }
    tbody {
      tr {
        background: ${({ theme }) => theme.colors.purplemid} !important;
        &:hover {
          background: ${({ theme }) => theme.colors.purplemid} !important;
          td {
            color: #fff !important;
          }
        }
        td {
          color: #fff !important;
        }
      }
    }
  }
  .dropdown {
    button {
      background: none;
      border: none;

      &:after {
        display: none;
      }
      &:focus {
        background: #0e1b2a;
      }
    }
  }
  .table-dark {
    background: none !important;
  }
`
