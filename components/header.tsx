'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'
import { NEXT_PUBLIC_SITE_TITLE } from '../app/server-constants'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'AllPost', path: '/blog' },
    { label: 'WORLD', path: '/world' },
    { label: '単語帳', path: '/world/submit' },
  ]

  return (
    <header className={styles.header} id="topJump">
      <h1>
        <Link href="/">
          {NEXT_PUBLIC_SITE_TITLE}
        </Link>
      </h1>

      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} className={pathname === path ? 'active' : null}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
