import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RealizarCadastroComponent } from './pages/login/realizar-cadastro/realizar-cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { MinhaContaComponent } from './pages/configuracoes/minha-conta/minha-conta.component';
import { TarefaAlunoComponent } from './pages/aluno/tarefa-aluno/tarefa-aluno.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { ProjetoAtualComponent } from './pages/projetos/projeto-atual/projeto-atual.component';

import { ProjetosOrientadorComponent } from './pages/projetos/projetos-orientador/projetos-orientador.component';
import { MeusAlunosComponent } from './pages/orientador/meus-alunos/meus-alunos.component';
import { BancasOrientadorComponent } from './pages/orientador/meus-alunos/bancas-orientador/bancas-orientador.component';
import { AulasAlunoComponent } from './pages/aluno/aulas-aluno/aulas-aluno.component';
import { AulasProfessorComponent } from './pages/professor/aulas-professor/aulas-professor.component';
import { TarefasProfessorComponent } from './pages/professor/tarefas-professor/tarefas-professor.component';
import { CadastroUsuariosComponent } from './pages/coordenador/cadastros/cadastro-usuarios/cadastro-usuarios.component';
import { BancaDefesaComponent } from './pages/coordenador/relatorios/banca-defesa/banca-defesa.component';
import { CadastroTurmasComponent } from './pages/coordenador/cadastros/cadastro-turmas/cadastro-turmas.component';
import { CadastroProfessoresOrientadoresComponent } from './pages/coordenador/cadastros/cadastro-professores-orientadores/cadastro-professores-orientadores.component';
import { CadastrarAulaComponent } from './pages/professor/aulas-professor/cadastrar-aula/cadastrar-aula.component';
import { CadastroAulasComponent } from './pages/coordenador/cadastros/cadastro-aulas/cadastro-aulas.component';
import { CadastroBancasComponent } from './pages/coordenador/cadastros/cadastro-bancas/cadastro-bancas.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'novocadastro', component: RealizarCadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'minhaconta', component: MinhaContaComponent },
  { path: 'tarefasaluno', component: TarefaAlunoComponent },
  { path: 'projetosdisponiveis', component: ProjetosComponent },
  { path: 'projetosorientador', component: ProjetosOrientadorComponent },
  { path: 'meuprojeto', component: ProjetoAtualComponent },
  { path: 'aulasaluno', component: AulasAlunoComponent },
  { path: 'tarefasprofessor', component: TarefasProfessorComponent },
  { path: 'aulasprofessor', component: AulasProfessorComponent },
  { path: 'meusalunospoc1', component: MeusAlunosComponent },
  { path: 'meusalunospoc2', component: MeusAlunosComponent },
  { path: 'bancasorientador', component: BancasOrientadorComponent },
  { path: 'cadastrousuarios', component: CadastroUsuariosComponent },
  { path: 'cadastroturmas', component: CadastroTurmasComponent },
  { path: 'cadastroprofessororientador', component: CadastroProfessoresOrientadoresComponent },
  { path: 'cadastroaulas', component: CadastroAulasComponent },
  { path: 'cadastrobancas', component: CadastroBancasComponent },
  { path: '**', redirectTo: '/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
