export class CreateUserDto {
    name: string; 
    email: string; 
    password: string; 
    active: boolean
}

export class UpdateUserDto {
    name?: string; 
    email?: string; 
    password?: string; 
    active?: boolean
}