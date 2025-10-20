import SideNavBar from '@renderer/components/layout/SideNavBar';
import '../main.css'            
import clsx from 'clsx';

type Props = {
    className?: string;
}
function Home({ className }: Props): React.JSX.Element {
  return <div className={clsx("flex h-screen w-full justify-start items-center", className)}>
        <SideNavBar/>
      </div>
}

export default Home