'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { menuOptions } from '@/lib/constant'
import clsx from 'clsx'
import { Separator } from '@/components/ui/separator'
import { ActivityIcon, Book, CircleAlert, CircleCheck, CircleHelpIcon, Database, GitBranch, Headphones, LucideMousePointerClick } from 'lucide-react'
import { ThemeSwitcher } from '@/components/mode-toggle'
import { ActivityLogIcon } from '@radix-ui/react-icons'

type Props = {}

const MenuOptions = (props: Props) => {
  const pathName = usePathname()

  return (
    <>
    <div className=" dark:bg-black h-screen overflow-scroll  justify-between flex items-center flex-col py-4 gap-10 px-4">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link
          className="flex font-bold flex-row items-center "
          href="/"
        >
        <span>Site</span>
        <ActivityIcon className="w-4 h-4" />
        </Link>
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li className='mb-0'>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'group h-8 w-8 flex items-center justify-center  scale-[1] rounded-full cursor-pointer',
                        {
                          'dark:bg-neutral-700 bg-[#f1f0f0] ':
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        className={clsx('w-5 h-5', {
                          'text-primary': pathName === menuItem.href,
                          'text-muted-foreground': pathName !== menuItem.href
                        })}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones className='text-muted-foreground' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <CircleHelpIcon className='text-muted-foreground' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Help</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
        <ThemeSwitcher />
      </div>
    </div>
    </>
  )
}

export default MenuOptions