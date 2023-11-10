import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RealizarCadastroComponent } from './pages/login/realizar-cadastro/realizar-cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { MinhaContaComponent } from './pages/configuracoes/minha-conta/minha-conta.component';
import { TarefaAlunoComponent } from './pages/aluno/tarefa-aluno/tarefa-aluno.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { ProjetoAtualComponent } from './pages/projetos/projeto-atual/projeto-atual.component';
import { CompromissosAlunoComponent } from './pages/aluno/compromissos-aluno/compromissos-aluno.component';
import { ProjetosOrientadorComponent } from './pages/projetos/projetos-orientador/projetos-orientador.component';

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
  { path: 'compromissosaluno', component: CompromissosAlunoComponent },
  { path: '**', redirectTo: '/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
