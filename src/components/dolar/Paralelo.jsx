import React, { useState, useEffect } from "react";

const Paralelo = () => {
  const [paralelo, setParalelo] = useState([
    { promedio: "", fechaActualizacion: "" },
  ]);

  const [bcv, setBcv] = useState([{ tasabcv: "", fechaActualizacionbcv: "" }]);

  const [dolarprom, setDolarProm] = useState(0);

  useEffect(() => {
    async function obtenerPromedio() {
      const url = "https://ve.dolarapi.com/v1/dolares/paralelo";
      const urlbcv = "https://ve.dolarapi.com/v1/dolares/oficial";
      const response = await fetch(url);
      const data = await response.json();
      const responsebcv = await fetch(urlbcv);
      const databcv = await responsebcv.json();

      const fechaISO = data.fechaActualizacion;

      // Convertir la fecha ISO a un objeto Date
      const fecha = new Date(fechaISO);

      // Crear formato en español
      const opciones = { 
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      // Usar Intl.DateTimeFormat para formatear la fecha
      const fechaFormateada = new Intl.DateTimeFormat("es-VE", opciones).format(
        fecha
      );
      function promedioFormateado(promedioFormato) {
        // Convertir el número a un formato con 2 decimales y cambiar el punto por coma
        return promedioFormato.toFixed(2).replace(".", ",");
      }
      let promedioFormato = data.promedio;

      function promedioFormateadoBcv(promedioFomatoBcv) {
        // Convertir el número a un formato con 2 decimales y cambiar el punto por coma
        return promedioFomatoBcv.toFixed(2).replace(".", ",");
      }
      let promedioFomatoBcv = databcv.promedio;

      setParalelo([
        {
          promedio: promedioFormateado(promedioFormato),
          fechaActualizacion: fechaFormateada,
        },
      ]);

      setBcv([
        {
          tasabcv: promedioFormateadoBcv(promedioFomatoBcv),
          fechaActualizacionbcv: fechaFormateada,
        },
      ]);
 
      function calcularPromedio(numeros) {
        // Sumar todos los números en el array y dividir entre la cantidad de elementos
        const suma = numeros.reduce((a, b) => a + b, 0);
        const promedio = suma / 2;
        return promedioFormateado(promedio);
      }
      // Ejemplo de uso
      let numeros = [
          parseFloat(promedioFomatoBcv),
         parseFloat(promedioFormato),
      ]; // Lista de números
      setDolarProm(calcularPromedio(numeros));
    }
    obtenerPromedio();
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          En Cuanto Está el Dolar Hoy En Venezuela
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
        {bcv.map((prombcv, index) => (
            <li
              key={index}
              className="py-3 sm:py-4 bg-green-400 p-4 rounded-md cursor-pointer"
            >
              <div className="flex items-center ">
                <div className="shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/img/bcv.webp"
                    alt="Bcv image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-base font-bold text-gray-900 truncate">
                    BCV
                  </p>
                  <p className="text-sm">
                    {prombcv.fechaActualizacionbcv}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                  Bs {prombcv.tasabcv}
                </div>
              </div>
            </li>
          ))}
          {/* <li className="py-3 sm:py-4 bg-yellow-200 p-4 rounded-md cursor-pointer">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/img/dolar.webp"
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-bold text-gray-900 truncate ">
                  Promedio
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900  ">
                Bs {dolarprom}
              </div>
            </div>
          </li>

          {paralelo.map((prom, index) => (
            <li
              key={index}
              className="py-3 sm:py-4 bg-red-400 p-4 rounded-md cursor-pointer"
            >
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/img/dolar.webp"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    Paralelo
                  </p>
                  <p className="text-sm">
                    {prom.fechaActualizacion}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  Bs {prom.promedio}
                </div>
              </div>
            </li>
          ))} */}
          
        </ul>
      </div>
    </div>
  );
};

export default Paralelo;
