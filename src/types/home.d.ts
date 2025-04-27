export interface HomeProps {
    success: boolean;
    lista_extrato: ListaExtrato;
    balanco: string;
}

export type ListaExtrato = [key: string, {
    id:             number;
    valor:          string;
    data:           string;
    pessoa_emitiu:  string;
    categoria:      string;
}]