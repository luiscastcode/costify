import { useState } from "react";

const NavMovil = () => {
  const [nav, setNav] = useState(false);
  const links2 = [
    {
      id: 1,
      nombre: "Home",
      url: "/",
    },
    {
      id: 2,
      nombre: "Servicios",
      url: "/servicios/",
    },  
    {
      id: 3,
      nombre: "Trámites",
      url: "/tramites/",
    },      
    {
      id: 6,
      nombre: "Noticias",
      url: "/noticias/",
    },  
    {
      id: 4,
      nombre: "Contacto",
      url: "/contacto/",
    },  
    {
      id: 5,
      nombre: "Acerca De",
      url: "/acerca-de/",
    },  
      
  ];
  return (
    <>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer  text-gray-900 md:hidden"
      >
        {nav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        )}
      </div>
      {nav && (
        <ul className="flex flex-col w-full absolute top-0 left-0 translate-y-[70px] font-medium p-2 mt-4  rounded-lg bg-gray-800">
          {links2.map(({ id, nombre, url }) => (
            <li key={id} className="cursor-pointer  text-white">
              <a
                href={url}
                class="block py-2 px-3 border-y border-gray-200"
              >
                {nombre}
              </a>
            </li>
          ))}
           
        </ul>
      )}
    </>
  );
};
export default NavMovil;