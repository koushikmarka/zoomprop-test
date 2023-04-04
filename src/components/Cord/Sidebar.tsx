import { SidebarLauncher, Sidebar } from '@cord-sdk/react'

const html: any =
  typeof document !== 'undefined' ? document.querySelector('html') : ''

export const CordSideBarLauncher = ({ handleCloseUserMenu }: any) => {
  return (
    <span>
      <SidebarLauncher
        onClick={handleCloseUserMenu}
        label=""
        iconUrl="https://zoomprop-marketing-site.s3.amazonaws.com/cord_icon_f6c9fe0bec.png"
      />
    </span>
  )
}

export const CordSideBar = () => (
  <div style={{ position: 'absolute' }}>
    <Sidebar
      showLauncher={false}
      open={false}
      onOpen={() => {
        html.classList.add('open')
      }}
      onClose={() => {
        html.classList.remove('open')
      }}
    />
  </div>
)
