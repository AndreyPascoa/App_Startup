export interface LoginProps {
    success: boolean;
    message: string;
    usuario: UsuarioProps
}

export interface UsuarioProps {
    id:             number;
    nome_social:    string;
    nome_completo:  string;
    email:          string;
    numero_celular: string;
    id_empresa:     string;
    token:          string;
    admin:          number;
}
