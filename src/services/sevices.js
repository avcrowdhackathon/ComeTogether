import {Role} from '../data/index'
import { users } from '../../users'

export const loginProcess = (username, password) => {
    var specificUser = '' 
    users.forEach(user => {
        if(user.username == username && user.password == password)
            specificUser=user
    })
    return specificUser
}