import { useState, type ChangeEvent, type Dispatch, type FormEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from '../types';
import categories from '../data/categories';
import { type ActivityActions, type ActivityState } from '../reducers/activityReducer';

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState : Activity = { 
    id: uuidv4(), //Genera un id unico cada vez que se crea una nueva actividad
    category: 1,
    name: '',
    calories: 0,
    cat: { id: 1, name: '' }
}

export default function Form({ dispatch, state }: FormProps) {

  //Un estado general ya que los demas estados se pueden manejar con un solo objeto
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if(state.activeId) { //El filter regresa un arreglo
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActivity(selectedActivity)
    }
  }, [state.activeId])
  
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    //Determina si el campo es de tipo numero
    const isNumberField = ['category', 'calories'].includes(e.target.id);


    setActivity({
      //Mantiene las demas propiedades del objeto
      ...activity,
      //El + convierte el valor a numero si es un campo numerico
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    });
  }

  //Variable para validar el formulario
  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch({ type: 'save-activity', payload: { newActivity: activity }})

    setActivity({
      ...initialState,
      id: uuidv4() //Genera un nuevo id para la siguiente actividad
    });
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className='font-bold'>Categoria:</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          name="category"
          value={activity.category}//Selecciona el valor por defecto de el select
          onChange={handleChange}
        >
          {categories.map(category => (
            <option 
              key={category.id}
              value={category.id}
              >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className='font-bold'>Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder='Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta'
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className='font-bold'>Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder='Ej. 300 o 500'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase rounded-lg text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />

    </form>
  )
}
