"use client";

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { SiGmail, SiSlack, SiPhonepe } from 'react-icons/si'
import { useSession } from "next-auth/react"

export default function ConnectComponent(){

    const { data: session } = useSession()
  
    const items = [
        {
            title: 'Email',
            description: 'You can specify up to 5 email addresses to which we will send notifications',
            value: session?.user?.email,
            icon: SiGmail,
            status: 'connected'
        },
        {
            title: 'Slack',
            description: 'You can specify up to 5 email addresses to which we will send notifications',
            value: session?.user?.name,
            icon: SiSlack,
            status: 'connected'
        },
        {
            title: 'Phone/SMS',
            description: 'You can specify up to 5 email addresses to which we will send notifications',
            value: session?.user?.email,
            icon: SiPhonepe,
            status: 'connected'
        }
    ]
        return (
            <div className='flex flex-row w-[800px] my-2'>
            {items.map((item, index) => (
            <Card key={index} className='mx-2 w-full'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><item.icon className='h-5 w-5'/>{item.title}</CardTitle>
                    <CardDescription>{item.value}</CardDescription>
                </CardHeader>
                <CardContent className='flex justify-end'>
                    {/* <div className='flex flex-col'>
                        <span className='flex gap-2'><item.icon className='h-5 w-5'/>{item.title}</span>
                        <span>{item.description}</span>
                    </div> */}
                    <Button>{item.status}</Button>
                </CardContent>
            </Card>
            ))}
        </div>
  )
}