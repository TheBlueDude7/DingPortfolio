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
        ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary
      `}
    > 
      <div className="w-full flex justify-between items-center max-w-7x1 mx-auto">
        <a 
          
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0,0);
          }}
        >
        <img src={logo} alt="logo" className="w-9 h-9 object-contain"/>
        <p className="text-white text-[18px] 
        font-bold cursor-pointer flex"> Roger
        &nbsp; <span className="sm:block hidden">
        Ding</span></p>
        </a>
        {/* This below helps format the navbar, make the link clickable, and also set the page to your desired index */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((Link) => (
            <li
              key={Link.id}
              className={`${
                active === Link.title ? "text-secondary" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(Link.title)}
            >
              <a href={`#${Link.id}`}>{Link.title}</a>
            </li>
            ))}
        </ul>
         {/* Roger this code is for Mobile formatting */}
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
                  } font-poppins font-medium 
                  cursor-pointer text-[16px]`}
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar