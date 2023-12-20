"use client"
import React, { Dispatch } from "react"

export type USER = {
    email: string, 
    issuer: string,
    wallet: string
} | null

export enum USERACTION_TYPES {
    LOG_IN = "LOG IN", 
    LOG_OUT = "LOG OUT",
}
export type ACTION = {
    type: USERACTION_TYPES
    user: USER
}

export type USERCONTEXT = {
    user: USER
    dispatch: Dispatch<ACTION>
}

export const UserReducer = (user: USER, action: ACTION) => {
    switch (action.type) {
        case USERACTION_TYPES.LOG_IN:
            return action.user
        case USERACTION_TYPES.LOG_OUT: 
            return null
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export const UserContext = React.createContext<USERCONTEXT>({
    user: null, 
    dispatch: () => {}
})
