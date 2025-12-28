import { Tramites } from "../data";
import Card from "./ui/Card";

const TramitesEnLinea = () => {
  let results = [];

  results = Tramites;

  return (
    <section
      className="rounded-md p-4 my-6"
    >
      <h3 className="bg-slate-100 p-3 rounded-md">
        Más Guías de Trámites en Línea
      </h3>
      <div
        id="masbuscados"
        className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-10"
      >
        {results.map((result) => (
          <Card key={result.id} item={result} href={`/tramites/${result.url}/`} />
        ))}
      </div>
    </section>
  );
};
export default TramitesEnLinea;
