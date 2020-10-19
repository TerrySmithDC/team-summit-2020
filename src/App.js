import React, { Suspense, lazy} from "react";
import "./App.css";

const Canvas = lazy(() => import('./Canvas'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Canvas />
      </Suspense>
      <article>Codecov Team Summit 2020</article>
    </div>
  );
}

export default App;
