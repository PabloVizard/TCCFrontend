export enum TipoUsuarioEnumerator {
    Aluno = 1,
    Professor,
    Orientador,
    ProfessorOrientador,
    Coordenador
}

export const TipoUsuarioEnumeratorString: { [key: string]: number } = {
    'Aluno': TipoUsuarioEnumerator.Aluno,
    'Professor': TipoUsuarioEnumerator.Professor,
    'Orientador': TipoUsuarioEnumerator.Orientador,
    'ProfessorOrientador': TipoUsuarioEnumerator.ProfessorOrientador,
    'Coordenador': TipoUsuarioEnumerator.Coordenador,
  };
  