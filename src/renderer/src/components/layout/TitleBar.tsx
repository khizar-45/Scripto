import '../../main.css'
import { useState, useEffect } from 'react';
import minIcon from '../../assets/icons/min-w-30.png';
import maxIcon from '../../assets/icons/max-w-30.png';
import restoreIcon from '../../assets/icons/restore-w-30.png';
import closeIcon from '../../assets/icons/close-w-30.png';

function TitleBar(): React.JSX.Element {
  const [isMaximized, setIsMaximized] = useState(false);

  // Icon is not changing on maximize/restore when user drags the title bar, create new state and fix it..

  useEffect(() => {
    window.electron.ipcRenderer.send("check-maximized");

    window.electron.ipcRenderer.on("window-maximized", () => setIsMaximized(true));
    window.electron.ipcRenderer.on("window-unmaximized", () => setIsMaximized(false));

    return () => {
      window.electron.ipcRenderer.removeAllListeners("window-maximized");
      window.electron.ipcRenderer.removeAllListeners("window-unmaximized");
    };
  }, []);


  const handleMinimize = () => {
    window.electron.ipcRenderer.send('window-minimize');
  }

  const handleMaximizeRestore = () => {
    if (isMaximized) {
      window.electron.ipcRenderer.send('window-restore');
      setIsMaximized(false);
    } else {
      window.electron.ipcRenderer.send('window-maximize');
      setIsMaximized(true);
    }
  }

  const handleClose = () => {
    window.electron.ipcRenderer.send('window-close');
  }

  return <>
    <div id="titlebar" className="h-[40px] bg-black w-full justify-between flex items-center pl-4 app-region-drag">
      <div className="text-white font-medium tracking-tighter text-lg">NoteMark</div>
      <div id="win-controls" className="flex h-full app-region-no-drag">
        <div
          className="w-12 h-full flex justify-center items-center hover:bg-white/15 cursor-pointer"
          onClick={handleMinimize}
        >
          <img src={minIcon} alt="Minimize" className="w-3 h-3"/>
        </div>

        <div
          className="w-12 h-full flex justify-center items-center hover:bg-white/15 cursor-pointer"
          onClick={handleMaximizeRestore}
        >
          <img
            src={isMaximized ? restoreIcon : maxIcon}
            alt={isMaximized ? "Restore" : "Maximize"}
            className="w-3 h-3"
          />
        </div>

        <div
          className="w-12 h-full flex justify-center items-center hover:bg-red-500 cursor-pointer"
          onClick={handleClose}
        >
          <img src={closeIcon} alt="Close" className="w-3 h-3"/>
        </div>
      </div>
    </div>
  </>
}

export default TitleBar
