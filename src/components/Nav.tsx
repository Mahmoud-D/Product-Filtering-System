import LangSwitcher from './LangSwitcher'
import ModeToggle from './theme/ModeToggle'

type TProps = {}
const Nav = ({}: TProps) => {
  return (
    <div className="flex justify-between py-2">
      <ModeToggle />
      <LangSwitcher />
    </div>
  )
}

export default Nav
