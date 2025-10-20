import '../../main.css';           
import clsx from 'clsx';

type Props = {
    className?: string;
}
function SideNavBar({ className }: Props): React.JSX.Element {
  return <div className={clsx("flex flex-col h-screen w-40 justify-center items-center border border-r-white/20", className)}>

      </div>
}

export default SideNavBar