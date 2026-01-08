import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { activityReducer, InitialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  //Dispatch es la funcion que se usa para enviar las acciones al reducer
  const [state, dispatch] = useReducer(activityReducer, InitialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const canRestartApp = () => useMemo(() => state.activities.length ,[state.activities])

  return (
    <>
      <header className="bg-lime-600 px-5 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities} //En dado caso se puede pasar todo el state
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
