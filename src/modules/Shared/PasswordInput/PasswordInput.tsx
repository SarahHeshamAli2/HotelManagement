import { Box, Button } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UseFormRegisterReturn } from "react-hook-form";
import useToggle from "../../../hooks/useToggle";


interface passwordInput {



    registerInput: UseFormRegisterReturn<string>
}

const PasswordInput:React.FC<passwordInput> = ({
    registerInput
}) => {

    const [value, toggleFunction] = useToggle(false);

return <>

<Box component='div' sx={{mt:'1rem' , position:'relative'}  } >



<label htmlFor="Password">Password</label>
    <input className="forgetPasswordInput"            type={value ? "text" : "password"} id="Password" placeholder="Please type here ..."           {...registerInput}
 />
      <Button           onClick={toggleFunction}
 onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}  sx={{position:'absolute' , top:'50%',translate:'-50%,-50%' , right:'30%' , color:'none' , ":hover" :{backgroundColor:'transparent'}}}>
            
            {value ? <svg width={'1.5rem'} height={'1.5rem'} viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.89062 3.82595L8.89472 5.83004L8.90426 5.72506C8.90426 4.67211 8.04855 3.81641 6.9956 3.81641L6.89062 3.82595Z" fill="#ABABAB"/>
<path d="M6.99623 2.54562C8.7522 2.54562 10.1773 3.97076 10.1773 5.72672C10.1773 6.13708 10.0946 6.52836 9.95149 6.88781L11.8124 8.74875C12.7731 7.94712 13.5302 6.91009 13.9978 5.72672C12.894 2.93373 10.1805 0.955078 6.99626 0.955078C6.10554 0.955078 5.25303 1.11412 4.46094 1.40042L5.83517 2.77146C6.1946 2.63151 6.58587 2.54562 6.99623 2.54562Z" fill="#ABABAB"/>
<path d="M0.636209 0.811179L2.08679 2.26176L2.37628 2.55125C1.32652 3.37197 0.496251 4.4631 0 5.72597C1.10067 8.51896 3.81731 10.4976 6.99842 10.4976C7.98457 10.4976 8.92616 10.3067 9.78825 9.96L10.0587 10.2304L11.9132 12.0882L12.7244 11.2802L1.44739 0L0.636209 0.811179ZM4.15452 4.3263L5.13748 5.30926C5.10885 5.44606 5.08976 5.58282 5.08976 5.72597C5.08976 6.77892 5.94547 7.63463 6.99842 7.63463C7.14157 7.63463 7.27837 7.61554 7.41197 7.58691L8.39493 8.56987C7.97183 8.77982 7.50105 8.90708 6.99842 8.90708C5.24245 8.90708 3.81731 7.48194 3.81731 5.72597C3.81731 5.22337 3.94457 4.75256 4.15452 4.3263Z" fill="#ABABAB"/>
</svg> :             <VisibilityIcon sx={{color:'#ABABAB'}}/>

}
            
            
            
            </Button>           

    
</Box>

</>
}

export default PasswordInput
