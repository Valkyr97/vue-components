import {QuestionType} from "../types/IForms.ts";
import {InputType} from "../enums/InputType.ts";

export type IDraggableItem = {
    type: QuestionType | ('Section' | 'PriceModifier' | 'PriceRule'),
    label: string,
    icon: string
}

export const formDraggableRepresentation: IDraggableItem[] = [
    {
        type: 'Section',
        label: 'Sección',
        icon: 'section'
    },
    {
        type: {
            [InputType.SELECT]: {type: 'radio', questionChoices: ['']}
        },
        label: 'Escoje uno',
        icon: 'list',
    },
    {
        type: {[InputType.SELECT]: {type: 'select', questionChoices: []}},
        label: 'Desplegable',
        icon: 'select',
    },
    {
        type: {[InputType.SELECT]: {type: 'checkbox', questionChoices: ['']}},
        label: 'Marca',
        icon: 'checkbox',
    },
    {
        type: {[InputType.TEXT]: {paragraph: false}},
        label: 'Texto corto',
        icon: 'text',
    },
    {
        type: {[InputType.TEXT]: {paragraph: true}},
        label: 'Párrafo',
        icon: 'textarea',
    },
    {
        type: {[InputType.NUMBER]: {}},
        label: 'Número',
        icon: 'number',
    },
    {
        type: {[InputType.EMAIL]: {}},
        label: 'Correo',
        icon: 'email',
    },
    {
        type: {[InputType.URL]: {}},
        label: 'Dirección electrónica',
        icon: 'uRL',
    },
    {
        type: {[InputType.DATE]: {}},
        label: 'Fecha',
        icon: 'date',
    },
    {
        type: {[InputType.TIME]: {}},
        label: 'Tiempo',
        icon: 'time',
    },
    {
        type: {[InputType.FILE]: {type: 'image'}},
        label: 'Imagen',
        icon: 'fileImage',
    },
    {
        type: {[InputType.FILE]: {type: 'document'}},
        label: 'Documento',
        icon: 'fileDoc',
    },
]

export const priceConfigElementsRepresentation: IDraggableItem[] = [
    {
        type: 'PriceRule',
        label: 'Condición',
        icon: 'link'
    },
    {
        type: 'PriceModifier',
        label: 'Modificador',
        icon: 'edit'
    },
]
