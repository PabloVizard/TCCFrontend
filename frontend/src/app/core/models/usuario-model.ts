export class UsuarioModel{
    id!: number;
    email!: string;
    cpf!: string;
    nomeCompleto!: string;
    senha!: string;
    tipoUsuario!: number;
} 

export class UsuarioLightModel{
    id!: number;
    email!: string;
    nomeCompleto!: string;
    tipoUsuario!: number;
}