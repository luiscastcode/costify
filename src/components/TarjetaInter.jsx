import { TarjetasInternacionales } from "../data";
import Card from "./ui/Card";

const TarjetaInter = () => {
  let results = [];

  results = TarjetasInternacionales;

  return (
    <div
      id="masbuscados"
      className="grid grid-cols md:grid-cols-4 justify-center gap-1 my-10"
    >
      {results.map((result) => (
        <Card key={result.id} item={result} href={`${result.url}`} />
      ))}
    </div>
  );
};
export default TarjetaInter;
