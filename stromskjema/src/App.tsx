import { SkjemaWiz } from "./components/SkjemaWiz";
import schemaData from "./data/privat-skjema.json";
import type { Schema } from "./types/schema";
import "./styling/index.css";

const schema = schemaData as Schema;

function App() {
  return (
    <main>
      <h1>Skjematesting</h1>
      <SkjemaWiz schema={schema} />
    </main>
  );
}

export default App;
