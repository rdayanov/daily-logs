import type { MetaFunction } from '@remix-run/node'
import { NavLink, Outlet } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Daily Logs' },
    { name: 'description', content: 'Look at you!' },
  ]
}

export default function Index() {
  return (
    <section>
      <header>
        <nav>
          <NavLink to="/template/new">Create Template</NavLink>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </section>
  )
}

