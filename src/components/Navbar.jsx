import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from  '../../public/assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`
        ${styles.paddingX} w-full flex flex-col items-center py-5 fixed top-0 z-40 bg-primary content-center
      `}
    > 
      <div className="flex-col w-full flex justify-between items-center max-w-7x1 mx-auto content-center">
        <a 
          
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0,0);
          }}
        >
        <img src={"./chickenIcon.png"} width="30" height="30"/>
        <p className="text-white text-[23px] 
        font-bold cursor-pointer flex" > Roger
        &nbsp; <span className="sm:block">
        Ding</span></p>
        </a>
        
         {/* Roger this code is for Mobile formatting
        <div className="sm:hidden flex flex-1 justify-end items-center">
              <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
              />
              <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 z-10 rounded-xl`}>
                <ul className="list-none flex justify-end items-start flex-col gap-4">
                {navLinks.map((Link) => (
                <li
                  key={Link.id}
                  className={`${
                  active === Link.title ? "text-secondary" : "text-secondary"
                  }`}
                  onClick={() =>  {
                    setToggle(!toggle);
                    setActive(Link.title);
                  }}
                >
                <a href={`#${Link.id}`}>{Link.title}</a>
                </li>
                ))}
                </ul>
              </div>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar