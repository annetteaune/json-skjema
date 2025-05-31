import { SkjemaWiz } from "./components/SkjemaWiz";
import schemaData from "./data/privat-skjema.json";
import type { Schema } from "./types/schema";

const schema = schemaData as Schema;

function App() {
  return (
    <>
      <h1>Skjematesting</h1>
      <SkjemaWiz schema={schema} />
    </>
  );
}

export default App;
