import { SkjemaWiz } from "./components/SkjemaWiz";
import privatSchema from "./data/privat-skjema.json";
import borettslagSchema from "./data/borettslag-skjema.json";
import bedriftSchema from "./data/bedrift-skjema.json";
import type { Schema } from "./types/schema";
import "./styling/index.css";
import { useState } from "react";

const schemas = {
  privat: privatSchema as Schema,
  borettslag: borettslagSchema as Schema,
  bedrift: bedriftSchema as Schema,
};

function App() {
  const [selectedForm, setSelectedForm] = useState<
    "privat" | "borettslag" | "bedrift"
  >("privat");

  return (
    <main>
      <h1>Skjematesting</h1>
      <div className="form-selector">
        <button
          className={`btn${selectedForm === "privat" ? " active" : ""}`}
          onClick={() => setSelectedForm("privat")}
        >
          Privat
        </button>
        <button
          className={`btn${selectedForm === "borettslag" ? " active" : ""}`}
          onClick={() => setSelectedForm("borettslag")}
        >
          Borettslag
        </button>
        <button
          className={`btn${selectedForm === "bedrift" ? " active" : ""}`}
          onClick={() => setSelectedForm("bedrift")}
        >
          Bedrift
        </button>
      </div>
      <SkjemaWiz schema={schemas[selectedForm]} />
    </main>
  );
}

export default App;
