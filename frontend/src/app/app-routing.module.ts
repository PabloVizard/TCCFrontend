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
  { path: 'aulasprofessor', component: AulasProfessorComponent },
  { path: 'meusalunospoc1', component: MeusAlunosComponent },
  { path: 'meusalunospoc2', component: MeusAlunosComponent },
  { path: 'bancasorientador', component: BancasOrientadorComponent },
  { path: '**', redirectTo: '/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
