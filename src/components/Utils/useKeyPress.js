import {useState,useEffect, useCallback} from "react";

const useKeyPress = (targetKey) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
  
    // If pressed key is our target key then set to true
    const downHandler = useCallback(({ key }) => {
      console.log(key)
      if (key === targetKey) {
        setKeyPressed(true);
      }else{
        setKeyPressed(false);
      }
    },[targetKey]);
  
    
  
    // Add event listeners
    useEffect(() => {
      window.addEventListener('keypress', downHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keypress', downHandler);
      };
    }, [downHandler]); // Empty array ensures that effect is only run on mount and unmount
  
    return keyPressed;
  }

  export default useKeyPress;