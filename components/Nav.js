import Link from 'next/link'
import styles from '../styles/Nav.module.css'

const Nav = ({ children }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>

    </nav>
  )
}

export default Nav
