import '../main.css'            
import clsx from 'clsx';

type Props = {
    className?: string;
}
function Home({ className }: Props): React.JSX.Element {
  return <div className={clsx("flex flex-col h-screen w-full justify-center items-center", className)}>
         <h1 className="text-4xl text-primary text-center">Welcome to NoteMark!</h1>
         <h3 className="text-lg text-white text-center mt-2">Your personal note-taking application.</h3>
      </div>
}

export default Home
