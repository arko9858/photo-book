import Counter from "./features/counter/Counter";
import Layout from "./Layout/Layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <Counter />
      </Layout>
    </div>
  );
}

export default App;
