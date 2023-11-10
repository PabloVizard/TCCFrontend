export enum TipoCompromissoEnumerator {
    Aula = 1,
    Reunião,
    DefesaPoc,
}

export const TipoCompromissoEnumeratorString: { [key: string]: number } = {
    'Aula': TipoCompromissoEnumerator.Aula,
    'Reunião': TipoCompromissoEnumerator.Reunião,
    'DefesaPoc': TipoCompromissoEnumerator.DefesaPoc
  };
  