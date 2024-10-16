'use client'

import { request } from '@/api/request'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ROUTES = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  Profile: '/user',
}

export const NavbarClient = ({ authToken }: { authToken?: string }) => {
  const actualPathname = usePathname()

  const signOut = async () => {
    try {
      await request('http://localhost:4000/user/logout')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '30rem',
        }}
      >
        {(Object.keys(ROUTES) as (keyof typeof ROUTES)[]).map((k) => {
          if (actualPathname === ROUTES[k]) {
            return null
          }
          if (['/login', '/register'].includes(ROUTES[k]) && authToken) {
            return null
          }
          return (
            <Link key={k} href={ROUTES[k]}>
              {k}
            </Link>
          )
        })}
        {authToken && (
          <button onClick={signOut} type="button" className="btn btn-primary">
            Logout
          </button>
        )}
      </div>
    </div>
  )
}
