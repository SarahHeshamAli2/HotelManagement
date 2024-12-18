import { useState } from "react";


const useToggle =(defaultValue:boolean)=>{


     const [value, setValue] = useState<boolean>(defaultValue);  


    const toggleFunction= ():void =>{
        
        setValue(prevValue => !prevValue)     
          
    }


    return [value,toggleFunction]as const

}

export default useToggle