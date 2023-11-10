export enum StatusAprovacaoEnumerator {
    Iniciado = 1,
    PodeDefender,
    Concluido,
    Adiado,
    Reprovado
}

export const StatusAprovacaoEnumeratorString: { [key: string]: number } = {
    'EmAndamento': StatusAprovacaoEnumerator.Iniciado,
    'PodeDefender': StatusAprovacaoEnumerator.PodeDefender,
    'Concluido': StatusAprovacaoEnumerator.Concluido,
    'Adiado': StatusAprovacaoEnumerator.Adiado,
    'Reprovado': StatusAprovacaoEnumerator.Reprovado
  };
  