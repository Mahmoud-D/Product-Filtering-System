import LangSwitcher from './LangSwitcher'
import ModeToggle from './theme/ModeToggle'

const Nav = () => {
  return (
    <div className="flex justify-between py-2">
      <ModeToggle />
      <LangSwitcher />
    </div>
  )
}

export default Nav
