import {type Activity } from "../types"

//Payload es la informacion que se envia al reducer junto con la accion
//Esa info se recupera con action.payload
export type ActivityActions = //Se pueden agregar mas acciones aqui
{ type: 'save-activity', payload: { newActivity: Activity} } |
{ type: 'set-activeId', payload: { id: Activity['id'] } } | 
{ type: 'deleted-activity', payload: { id: Activity['id'] } } | 
{ type: 'restart-app'} //No necesita un payload porque regresara todo a 0

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'] //Lookup que se puede actualizar despues
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

//Puede tener multiples estados iniciales
export const InitialState : ActivityState= {
    activities: localStorageActivities(),
    activeId: ''
}

//Conecta a ambos
export const activityReducer = (
        state: ActivityState = InitialState,
        action: ActivityActions
    ) => {

        if(action.type === 'save-activity') {
            //Este codigo maneja la logica para actualizar el state

            let updatedActivities : Activity[] = [];

            if(state.activeId) {
                updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity);
            } else {
                updatedActivities = [...state.activities, action.payload.newActivity]
            }
            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            }
        }

        //Esta accion actualiza el activeId
        if(action.type === 'set-activeId') {
            return {
                ...state,
                activeId: action.payload.id
            }
        }

        if(action.type === 'deleted-activity') {
            return {
                ...state,
                activities: state.activities.filter( activity => activity.id !== action.payload.id )
            }
        }

        if(action.type === 'restart-app') {
            //No es necesario el state porque se reinicia
            return {
                activities: [],
                activeId: ''
            }
        }

        return state;
}