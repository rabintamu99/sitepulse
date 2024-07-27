import React from 'react'
import Sidebar from '@/components/sidebar'
import InfoBar from '@/components/infobar'
import Dock from '@/components/sidebar/dock'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { HardDrive, PackageOpen, WheatIcon } from 'lucide-react'

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <InfoBar credits={10} tier="Free" />
        {props.children}
        {/* <Dock /> */}
      </div>
    </div>
  )
}
export default Layout