import React, { useState, useEffect } from "react";

  

        // --- Main App Component ---
        const CalculadoraPrecio = ()=> {
            // State variables to manage data
            const [exchangeRate, setExchangeRate] = useState(null);
            const [dollarPrice, setDollarPrice] = useState('');
            const [profitMargin, setProfitMargin] = useState('30'); // Default margin
            const [finalPrice, setFinalPrice] = useState(null);
            const [finalPriceUsd, setFinalPriceUsd] = useState(null);
            const [isLoading, setIsLoading] = useState(true);
            const [error, setError] = useState('');

            // Fetch the exchange rate when the component mounts
            useEffect(() => {
                const fetchExchangeRate = async () => {
                    setIsLoading(true);
                    setError('');
                    try {
                        // Using a more stable API endpoint for Venezuelan rates
                        const apiUrl = 'https://ve.dolarapi.com/v1/dolares/oficial';
                        const response = await fetch(apiUrl);
                        if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();
                        // Correctly access the nested price property for the 'enparalelovzla' monitor
                        if (data && data.promedio) {
                            setExchangeRate(data.promedio);
                        } else {
                            throw new Error('Formato de respuesta de la API no válido.');
                        }
                    } catch (e) {
                        console.error("Error fetching exchange rate:", e);
                        setError('No se pudo obtener la tasa de cambio. Inténtelo más tarde.');
                        setExchangeRate(null);
                    } finally {
                        setIsLoading(false);
                    }
                };

                fetchExchangeRate();
            }, []); // Empty dependency array means this runs only once on mount

            // --- Calculation Logic ---
            const handleCalculate = (e) => {
                e.preventDefault(); // Prevent form from reloading the page

                const price = parseFloat(dollarPrice);
                const margin = parseFloat(profitMargin);

                if (!price || price <= 0 || !margin || margin < 0 || !exchangeRate) {
                    setFinalPrice(null);
                    if (!price || price <= 0) {
                        // Using a custom modal/alert in the future would be better
                        // but for now, this prevents the app from crashing.
                        console.warn("Precio en dólares no válido.");
                        return;
                    }
                }

                // Convert USD cost to Bolivares
                const costInBolivares = price * exchangeRate;

                // Convert percentage margin to a decimal
                const marginDecimal = margin / 100;

                // Formula for Selling Price with Profit Margin: Cost / (1 - Profit Margin)
                const calculatedPrice = costInBolivares / (1 - marginDecimal);
                const calculatedPriceUsd = calculatedPrice / exchangeRate;

                setFinalPrice(calculatedPrice);
                setFinalPriceUsd(calculatedPriceUsd);
            };

            // Helper to format numbers as Venezuelan currency
            const formatCurrency = (value) => {
                if (typeof value !== 'number') return '';
                return value.toLocaleString('es-VE', {
                    style: 'currency',
                    currency: 'VES', // Using VES for Bolivar Soberano
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            };
             // Helper to format numbers as Venezuelan currency
            const formatCurrencyUsd = (value) => {
                if (typeof value !== 'number') return '';
                return value.toLocaleString('es-VE', {
                    style: 'currency',
                    currency: 'USD', // Using USD
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            };

            // --- Rendered UI (JSX) ---
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">

                        {/* Header Section */}
                        <div className="text-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Calculadora de Precios</h1>
                            <p className="text-gray-500 mt-1">De USD a Bolívares con rentabilidad</p>
                        </div>

                        {/* Exchange Rate Display */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <p className="text-sm font-medium text-gray-500">Tasa de cambio del día BCV</p>
                            {isLoading && (
                                <div className="flex justify-center items-center mt-2">
                                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                                    <span className="ml-3 text-gray-600">Cargando...</span>
                                </div>
                            )}
                            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                            {exchangeRate && !isLoading && (
                                <p className="text-2xl md:text-3xl font-bold text-indigo-600 mt-1">
                                    {formatCurrency(exchangeRate).replace('VES', 'Bs.')}
                                </p>
                            )}
                        </div>

                        {/* Calculation Form */}
                        <form onSubmit={handleCalculate} className="space-y-4">
                            <div>
                                <label htmlFor="dollar-price" className="block text-sm font-medium text-gray-700">Costo del producto (USD)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="dollar-price"
                                        value={dollarPrice}
                                        onChange={(e) => setDollarPrice(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 pl-7 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Ej: 25.50"
                                        step="0.01"
                                        required
                                        disabled={isLoading || !!error}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="profit-margin" className="block text-sm font-medium text-gray-700">Margen de rentabilidad (%)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                     <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <span className="text-gray-500 sm:text-sm">%</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="profit-margin"
                                        value={profitMargin}
                                        onChange={(e) => setProfitMargin(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 pl-7 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Ej: 30"
                                        required
                                        disabled={isLoading || !!error}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !!error}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                            >
                                Calcular Precio Final
                            </button>
                        </form>

                        {/* Result Display */}
                        {finalPrice !== null && (
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">Precio de Venta Sugerido (P.V.P)</p>
                                        <p className="text-xl font-bold text-green-900 mt-1">
                                            {formatCurrency(finalPrice).replace('VES', 'Bs.')}
                                        </p>
                                        <p className="text-xl font-bold text-green-900 mt-1">
                                            {formatCurrencyUsd(finalPriceUsd).replace('USD','$')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            );
        }

        export default CalculadoraPrecio