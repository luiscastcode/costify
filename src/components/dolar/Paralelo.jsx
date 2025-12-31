import React, { useState, useEffect } from "react";

// Utilidad para formatear números en español (con coma decimal)
const formatearNumero = (numero) => {
  return numero.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Utilidad para formatear fecha en zona horaria de Venezuela
const formatearFechaVenezuela = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-VE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Caracas",
  }).format(fecha);
};

const Paralelo = () => {
  const [paralelo, setParalelo] = useState({
    promedio: "",
    fechaActualizacion: "",
  });

  const [bcv, setBcv] = useState({
    tasabcv: "",
    fechaActualizacionbcv: "",
  });

  const [euro, setEuro] = useState({
    tasaeuro: "",
    fechaActualizacioneuro: "",
  });

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setCargando(true);
        setError(null);

        // Realizar todas las peticiones en paralelo para mejor rendimiento
        const [dataParalelo, dataBcv, dataEuro] = await Promise.all([
          fetch("https://ve.dolarapi.com/v1/dolares/paralelo").then((res) =>
            res.json()
          ),
          fetch("https://ve.dolarapi.com/v1/dolares/oficial").then((res) =>
            res.json()
          ),
          fetch("https://api.exchangerate-api.com/v4/latest/USD").then((res) =>
            res.json()
          ),
        ]);

        // Calcular tasa del Euro en Bs: (Tasa BCV en Bs) * (EUR/USD)
        const tasaEuroEnBs = dataBcv.promedio / dataEuro.rates.EUR;

        // Formatear fecha en zona horaria de Venezuela
        const fechaFormateada = formatearFechaVenezuela(
          dataParalelo.fechaActualizacion
        );

        // Actualizar estados con datos formateados
        setParalelo({
          promedio: formatearNumero(dataParalelo.promedio),
          fechaActualizacion: fechaFormateada,
        });

        setBcv({
          tasabcv: formatearNumero(dataBcv.promedio),
          fechaActualizacionbcv: fechaFormateada,
        });

        setEuro({
          tasaeuro: formatearNumero(tasaEuroEnBs),
          fechaActualizacioneuro: fechaFormateada,
        });
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Error al cargar los datos. Por favor, intenta de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  if (cargando) {
    return (
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-600 dark:text-gray-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-center h-40">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          ¿En Cuánto Está el Dólar Hoy en Venezuela?
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {/* BCV - Dólar Oficial */}
          <li className="py-3 sm:py-4 bg-green-400 p-4 rounded-md cursor-pointer">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/img/bcv.webp"
                  alt="BCV"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-base font-bold text-gray-900 truncate">
                  BCV $
                </p>
                <p className="text-sm">{bcv.fechaActualizacionbcv}</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                Bs {bcv.tasabcv}
              </div>
            </div>
          </li>

          {/* Euro en Bolívares */}
          <li className="py-3 sm:py-4 bg-yellow-200 p-4 rounded-md cursor-pointer">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/img/dolar.webp"
                  alt="Euro"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-bold text-gray-900 truncate">
                  Euro €
                </p>
                <p className="text-sm">{euro.fechaActualizacioneuro}</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                Bs {euro.tasaeuro}
              </div>
            </div>
          </li>

          {/* Paralelo - USDT Bybit */}
          <li className="py-3 sm:py-4 bg-red-700 p-4 rounded-md cursor-pointer">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/img/dolar.webp"
                  alt="USDT"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-bold text-gray-900 truncate">
                  USDT Bybit ₮
                </p>
                <p className="text-sm">{paralelo.fechaActualizacion}</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                Bs {paralelo.promedio}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Paralelo;
