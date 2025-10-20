import '../../main.css';
import { useState, useEffect } from 'react';
import minIcon from '../../assets/icons/min-w-30.png';
import maxIcon from '../../assets/icons/max-w-30.png';
import restoreIcon from '../../assets/icons/restore-w-30.png';
import closeIcon from '../../assets/icons/close-w-30.png';
import clsx from 'clsx';

type Props = {
    className?: string;
}

function TitleBar({className}: Props): React.JSX.Element {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Ask main process for current state on mount
    window.electron.ipcRenderer.send("check-window-state");

    // Listen for window state changes
    window.electron.ipcRenderer.on("window-maximized", () => setIsMaximized(true));
    window.electron.ipcRenderer.on("window-unmaximized", () => setIsMaximized(false));

    return () => {
      window.electron.ipcRenderer.removeAllListeners("window-maximized");
      window.electron.ipcRenderer.removeAllListeners("window-unmaximized");
    };
  }, []);

  const handleMinimize = () => {
    window.electron.ipcRenderer.send("window-minimize");
  };

  const handleMaximizeRestore = () => {
    window.electron.ipcRenderer.send(isMaximized ? "window-restore" : "window-maximize");
  };

  const handleClose = () => {
    window.electron.ipcRenderer.send("window-close");
  };

  return (
    <div id="titlebar" className={clsx("h-[40px] bg-black w-full justify-between flex items-center pl-4 app-region-drag border border-b-white/20 ", className)}>
      <div className="text-white font-medium tracking-tighter text-sm">NoteMark</div>
      <div id="win-controls" className="flex h-full app-region-no-drag">
        <div
          className="w-12 h-full flex justify-center items-center hover:bg-white/10 cursor-pointer"
          onClick={handleMinimize}
        >
          <img src={minIcon} alt="Minimize" className="w-[11px] h-[11px]" />
        </div>

        <div
          className="w-12 h-full flex justify-center items-center hover:bg-white/10 cursor-pointer"
          onClick={handleMaximizeRestore}
        >
          <img
            src={isMaximized ? restoreIcon : maxIcon}
            alt={isMaximized ? "Restore" : "Maximize"}
            className="w-2.5 h-2.5"
          />
        </div>

        <div
          className="w-12 h-full flex justify-center items-center hover:bg-red-500 cursor-pointer"
          onClick={handleClose}
        >
          <img src={closeIcon} alt="Close" className="w-[11px] h-[11px]" />
        </div>
      </div>
    </div>
  );
}

export default TitleBar;
