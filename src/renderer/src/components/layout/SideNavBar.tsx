import '../../main.css';
import clsx from 'clsx';
import { Book, AlarmClockCheck } from 'lucide-react';
import { useState } from 'react';

type Props = {
  className?: string;
};

function SideNavBar({ className }: Props): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes');

  const tabs = [
    { id: 'notes', label: 'Notes', icon: Book },
    { id: 'tasks', label: 'Tasks', icon: AlarmClockCheck },
  ];

  return (
    <div
      className={clsx(
        'flex flex-col h-full w-40 justify-start items-center border-r border-white/20 bg-black',
        className
      )}
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <div
            key={id}
            onClick={() => setActiveTab(id as 'notes' | 'tasks')}
            className={clsx(
              'flex cursor-pointer h-16 w-full justify-center items-center border-b border-white/20 text-sm transition-colors duration-50',
              isActive
                ? 'bg-primary text-black'
                : 'text-gray-50 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon className={clsx('mr-2 w-4 h-4', isActive ? 'text-black' : 'text-gray-50')} />
            {label}
          </div>
        );
      })}
    </div>
  );
}

export default SideNavBar;
