import React from 'react';

const Card = ({ item, href }) => {
  return (
    <a
      href={href}
      target={item.target || "_self"}
      className="inline-flex font-bold items-center text-gray-600 hover:underline capitalize h-full"
    >
      <div className="w-full h-full p-4 bg-white border border-gray-400 rounded-lg shadow flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
        <img
          className="rounded-t-lg p-2 max-h-40 object-contain"
          src={`/img/${item.img}`}
          alt={item.nombre}
          loading="lazy"
        />
        <h3 className="mt-2">{item.nombre}</h3>
      </div>
    </a>
  );
};

export default Card;
