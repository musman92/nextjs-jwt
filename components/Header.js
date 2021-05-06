
import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>JWT</span> Test
      </h1>
    </div>
  )
}

export default Header