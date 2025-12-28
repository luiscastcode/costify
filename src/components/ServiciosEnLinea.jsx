import { Servicios } from "../data";
import Card from "./ui/Card";

const ServiciosEnLinea = () => {
  let results = [];

  results = Servicios;

  return (
    <section className="rounded-md p-4 my-6">
      <h2 className="bg-slate-100 p-3 rounded-md text-center">Pagar en Linea Servicios Públicos o Privados</h2>
      <p>
        Realiza el pago de los servicios públicos y privados en línea, servicios
        esenciales como electricidad, agua y telecomunicaciones se pueden pagar
        de manera rápida, segura y cómoda a través de plataformas digitales.
      </p>
      <div
        id="masbuscados"
        className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-10"
      >
        {results.map((result) => (
          <Card key={result.id} item={result} href={`/servicios/${result.url}/`} />
        ))}
      </div>
    </section>
  );
};
export default ServiciosEnLinea;
