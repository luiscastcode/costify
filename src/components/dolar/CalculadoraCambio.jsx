import React, { useState, useEffect } from "react";

const CalculadoraCambio = ({tipo}) => {
  // Estados para los montos y tipos de cambio
  const [monto, setMonto] = useState(1);
  const [moneda, setMoneda] = useState("USD");
  const [tasaBCV, setTasaBCV] = useState(0); // Puedes cambiar por el valor actual
  const [tasaParalelo, setTasaParalelo] = useState(0); // Valor actual estimado

  useEffect(() => {
    async function obtenerPromedio() {
      const url = "https://ve.dolarapi.com/v1/dolares/paralelo";
      const urlbcv = "https://ve.dolarapi.com/v1/dolares/oficial";
      const response = await fetch(url);
      const data = await response.json();
      const responsebcv = await fetch(urlbcv);
      const databcv = await responsebcv.json();

      setTasaParalelo(data.promedio);
      setTasaBCV(databcv.promedio);
      // Calcular promedio
    }
    obtenerPromedio();
  }, []);

  const tasaPromedio = (tasaBCV + tasaParalelo) / 2;
  // Función para calcular resultados
  const calcular = (valor, tipoEntrada) => {
    let resultado = {};

    if (tipoEntrada === "USD") {
      const valorNum = parseFloat(valor);
      resultado.BCV = valorNum * tasaBCV;
      resultado.Paralelo = valorNum * tasaParalelo;
      resultado.Promedio = valorNum * tasaPromedio;
    } else {
      const valorNum = parseFloat(valor);
      resultado.BCV = valorNum / tasaBCV;
      resultado.Paralelo = valorNum / tasaParalelo;
      resultado.Promedio = valorNum / tasaPromedio;
    }

    return resultado;
  };

  const resultados = calcular(monto, moneda);
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl md:text-3xl mt-6 text-center">
        Calculadora de Tipo de Cambio {tipo}
      </h2>

      <div className="mt-2 space-y-3 flex justify-center items-center">
        <label className="inline-block text-sm font-medium">
          Monto:
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Introduce el monto"
            className="py-1.5 sm:py-2 px-3 pe-1 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
        </label>
        <label className="inline-block text-sm font-medium">
          Moneda:
          <select
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
            className="py-1.5 sm:py-2 px-3 pe-1 block w-full border-gray-200 shadow-2xs sm:text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          >
            <option value="USD">Dólares (USD)</option>
            <option value="Bs">Bolívares (Bs)</option>
          </select>
        </label>
      </div>

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 md:px-8 mx-auto">
        <div class="grid grid-cols-1 gap-1">
          <div class="flex justify-center items-center flex-col bg-amber-400 border border-gray-200 shadow-2xs rounded-xl">
            <div class="p-4 md:p-5">
              <div class="gap-2">
                <p class="text-xs uppercase">
                <span className="font-bold text-gray-900">Resultado a BCV</span>
                </p>
              </div>

              <div class="gap-2">
                <h3 class="text-4xl sm:text-2xl text-blue-700">
                  {resultados.BCV?.toFixed(2).replace(".", ",")} {moneda === "USD" ? "Bs" : "USD"}
                </h3>
              </div>
            </div>
          </div>

          {/* <div class="flex flex-col bg-yellow-200 border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-x-2">
                <p class="text-xs uppercase">
                <span className="font-bold">Dolar Promedio</span>
                </p>
              </div>

              <div class="mt-1 flex items-center gap-x-2">
                <h3 class="text-xl sm:text-2xl font-medium">
                  {resultados.Promedio?.toFixed(2).replace(".", ",")}{" "}
                  {moneda === "USD" ? "Bs" : "USD"}
                </h3>
              </div>
            </div>
          </div> */}

          {/* <div class="flex flex-col bg-red-600 border border-gray-200 shadow-2xs rounded-xl">
            <div class="p-4 md:p-5">
              <div class="flex items-center gap-x-2">
                <p class="text-xs uppercase text-slate-100">
                  <span className="font-bold">Dolar Paralelo</span>
                </p>
              </div>

              <div class="mt-1 flex items-center gap-x-2">
                <h3 class="text-xl sm:text-2xl font-medium text-slate-100">
                  {resultados.Paralelo?.toFixed(2).replace(".", ",")}{" "}
                  {moneda === "USD" ? "Bs" : "USD"}
                </h3>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CalculadoraCambio;
