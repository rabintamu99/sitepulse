import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { SiGmail } from 'react-icons/si'

const ConnectComponent = () => {
    const items = [
        {
            title: 'Email',
            description: 'You can specify up to 5 email addresses to which we will send notifications',
            icon: SiGmail,
            status: 'connected'
        }
    ]
        return (
            <div className='flex flex-col w-5xl '>
        {items.map((item, index) => (
        <Card key={index}>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><item.icon className='h-5 w-5'/>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Connect</Button>
            </CardContent>
        </Card>
        ))}
    </div>
  )
}

export default ConnectComponent