import { CategoriasPrincipales } from "../data";
import Card from "./ui/Card";

const Buscador = () => {
  let results = [];

  results = CategoriasPrincipales;

  const destacados = results.filter(
    (destacado) =>
      destacado.id === 1 ||
      destacado.id === 2 ||
      destacado.id === 3 ||
      destacado.id === 4


  );


  return (
    <section id="pagar-servicios" className="rounded-md p-4 my-6">
      <h3 className="bg-slate-100 p-3 rounded-md">
        Recursos Necesarios Para Tu Bodega
      </h3>

      <div

        className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-5"
      >
        {destacados.map((result) => (
          <Card key={result.id} item={result} href={`/${result.url}/`} />
        ))}
      </div>
    </section>
  );
};
export default Buscador;
