import React from 'react'
import "../CSS/Header.css"
import AddIcon from '@mui/icons-material/Add';
const Header = () => {
  return (
    <>
    <div className='firstdiv'>
      <span><h1 className='firsth1'>Film World</h1></span>
      <button><AddIcon/></button><h3>Click me</h3>
    </div>
    </>
  )
}

export default Header
