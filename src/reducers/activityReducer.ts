import {type Activity } from "../types"

//Payload es la informacion que se envia al reducer junto con la accion
//Esa info se recupera con action.payload
export type ActivityActions = 
{ type: 'save-activity', payload: { newActivity: Activity} } |
{ type: 'set-activeId', payload: { id: Activity['id'] } } //Se pueden agregar mas acciones aqui

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'] //Lookup que se puede actualizar despues
}

//Puede tener multiples estados iniciales
export const InitialState : ActivityState= {
    activities: [],
    activeId: ''
}

//Conecta a ambos
export const activityReducer = (
        state: ActivityState = InitialState,
        action: ActivityActions
    ) => {

        if(action.type === 'save-activity') {
            //Este codigo maneja la logica para actualizar el state
            return {
                //Toma una copia del estado
                ...state,
                activities: [...state.activities, action.payload.newActivity]
            }
        }

        //Esta accion actualiza el activeId
        if(action.type === 'set-activeId') {
            return {
                ...state,
                activeId: action.payload.id
            }
        }
        return state;




        /* switch(action.type) {
        //     //Este codigo maneja la logica para actualizar el state
        //     case 'save-activity': {
        //         return console.log('Desde el type de save activity');
        //     }
        */ 
}