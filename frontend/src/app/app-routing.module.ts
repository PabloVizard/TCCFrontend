import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RealizarCadastroComponent } from './pages/login/realizar-cadastro/realizar-cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { MinhaContaComponent } from './pages/configuracoes/minha-conta/minha-conta.component';
import { TarefaAlunoComponent } from './pages/aluno/tarefa-aluno/tarefa-aluno.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'novocadastro', component: RealizarCadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'minhaconta', component: MinhaContaComponent },
  { path: 'tarefasaluno', component: TarefaAlunoComponent },
  { path: '**', redirectTo: '/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
