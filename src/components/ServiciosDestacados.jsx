import { Servicios } from "../data";
import Card from "./ui/Card";

const ServiciosDestacados = () => {
  let results = [];

  results = Servicios;

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
        Los Servicios Que Debes Mantener Al Día
      </h3>
      <div
        id="masbuscados"
        className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-8"
      >
        {destacados.map((result) => (
          <Card key={result.id} item={result} href={`/servicios/${result.url}/`} />
        ))}
      </div>
    </section>
  );
};
export default ServiciosDestacados;
