import 'bootstrap/dist/css/bootstrap.min.css'

import { Inter } from 'next/font/google'
import { Navbar } from '../components/navbar-server'
import { MainContainer } from '../components'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { request } from '@/api/request'

export const metadata: Metadata = {
  title: 'Architecture playground',
  description: 'by Adam Polczynski',
}

const inter = Inter({ subsets: ['latin'] })

export default async ({ children }: { children: React.ReactNode }) => {
  const authToken = cookies().get('token')?.value
  const user = await (await request('http://backend:4000/user', undefined, authToken)).json()
  console.warn('cookies authToken: ', authToken)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user={user} />
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  )
}
