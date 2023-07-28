import React from 'react';
import { InstagramLogo, Envelope, FacebookLogo } from '@phosphor-icons/react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 text-left">
      <div className="align-top flex justify-start">
        <img
          className="h-[50px] w-[60px] mr-2"
          src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png"
          alt="Logo"
        />
        <div>
          <p className="mb-2">© 2022 - Todos los derechos reservados</p>
        </div>
        <div className="flex flex-col items-start ml-auto"> 
          <div className="flex items-center">
            <InstagramLogo size={32} color="#d9d9d9" weight="fill" />
            <span className="ml-2">@Hotel_HUNT</span>
          </div>
          <div className="flex items-center">
            <Envelope size={32} color="#d9d9d9" weight="fill" />
            <span className="ml-2">HotelHunt@gmail.com</span>
          </div>
          <div className="flex items-center">
            <FacebookLogo size={32} color="#d9d9d9" weight="fill" />
            <span className="ml-2">The Hotel Hunt</span>
          </div>
        </div>
      </div>
    </footer>
  );
  
  

  
  




};

export default Footer;
