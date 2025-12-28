import { TarjetasInternacionales } from "../data";
import Card from "./ui/Card";

const TarjetasDestacadas = () => {
  let results = [];

  results = TarjetasInternacionales;

  const destacados = results.filter(
    (destacado) =>
      destacado.id === 1 ||
      destacado.id === 2 ||
      destacado.id === 3 ||
      destacado.id === 4
  );

  return (
    <section className="rounded-md p-4 my-6">
      <h3 className="bg-slate-100 p-3 rounded-md">
        Los Tarjetas Internacionales Más Buscadas en Pagar en Línea
      </h3>
      <div
        id="masbuscados"
        className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-10"
      >
        {destacados.map((result) => (
          <Card key={result.id} item={result} href={`${result.url}`} />
        ))}
      </div>
    </section>
  );
};
export default TarjetasDestacadas;
