import { Tramites } from "../data";
import Card from "./ui/Card";

const TramitesDestacados = () => {
  let results = [];

  results = Tramites;

  const destacados = results.filter(
    (destacado) =>
      destacado.id === 1 ||
      destacado.id === 8 ||
      destacado.id === 5 ||
      destacado.id === 6
  );

  return (
    <section className="rounded-md p-4 my-6">
      <h3 className="bg-slate-100 p-3 rounded-md">
        Los Trámites Más Usados Por Tu Bodega
      </h3>
      <div
        id="masbuscados"
        className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-10"
      >
        {destacados.map((result) => (
          <Card key={result.id} item={result} href={`/tramites/${result.url}/`} />
        ))}
      </div>
    </section>
  );
};
export default TramitesDestacados;
