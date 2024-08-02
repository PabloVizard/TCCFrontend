import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpLoadingInterceptor } from './core/interceptor/http-request-interceptor';
import { RealizarCadastroComponent } from './pages/login/realizar-cadastro/realizar-cadastro.component';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HomeComponent } from './pages/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidenavComponent } from './shared/pages/sidenav/sidenav.component';
import { AuthService } from './core/services/auth.service';
import { MinhaContaComponent } from './pages/configuracoes/minha-conta/minha-conta.component';
import { TarefaAlunoComponent } from './pages/aluno/tarefa-aluno/tarefa-aluno.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuAlunoComponent } from './shared/pages/sidenav/menu-aluno/menu-aluno.component';
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { ProjetoAtualComponent } from './pages/projetos/projeto-atual/projeto-atual.component';
import { SemInformacoesComponent } from './shared/pages/sem-informacoes/sem-informacoes.component';
import { EnviarTarefaAlunoComponent } from './pages/aluno/tarefa-aluno/enviar-tarefa-aluno/enviar-tarefa-aluno.component';
import { MenuProfessorComponent } from './shared/pages/sidenav/menu-professor/menu-professor.component';
import { MenuOrientadorComponent } from './shared/pages/sidenav/menu-orientador/menu-orientador.component';
import { MenuCoordenadorComponent } from './shared/pages/sidenav/menu-coordenador/menu-coordenador.component';
import { AdicionarProjetoComponent } from './pages/projetos/adicionar-projeto/adicionar-projeto.component';
import { ProjetosOrientadorComponent } from './pages/projetos/projetos-orientador/projetos-orientador.component';
import { MeusAlunosComponent } from './pages/orientador/meus-alunos/meus-alunos.component';
import { EditarAlunosOrientadosComponent } from './pages/orientador/meus-alunos/editar-alunos-orientados/editar-alunos-orientados.component';
import { RecomendarBancaComponent } from './pages/orientador/meus-alunos/recomendar-banca/recomendar-banca.component';
import { BancasOrientadorComponent } from './pages/orientador/meus-alunos/bancas-orientador/bancas-orientador.component';
import { AulasAlunoComponent } from './pages/aluno/aulas-aluno/aulas-aluno.component';
import { AulasProfessorComponent } from './pages/professor/aulas-professor/aulas-professor.component';
import { CadastrarAulaComponent } from './pages/professor/aulas-professor/cadastrar-aula/cadastrar-aula.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TarefasProfessorComponent } from './pages/professor/tarefas-professor/tarefas-professor.component';
import { CadastrarTarefaComponent } from './pages/professor/tarefas-professor/cadastrar-tarefa/cadastrar-tarefa.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RealizarCadastroComponent,
    HomeComponent,
    SidenavComponent,
    MinhaContaComponent,
    TarefaAlunoComponent,
    MenuAlunoComponent,
    ProjetosComponent,
    ProjetoAtualComponent,
    SemInformacoesComponent,
    AulasAlunoComponent,
    EnviarTarefaAlunoComponent,
    MenuProfessorComponent,
    MenuOrientadorComponent,
    MenuCoordenadorComponent,
    AdicionarProjetoComponent,
    ProjetosOrientadorComponent,
    MeusAlunosComponent,
    EditarAlunosOrientadosComponent,
    RecomendarBancaComponent,
    BancasOrientadorComponent,
    AulasProfessorComponent,
    CadastrarAulaComponent,
    TarefasProfessorComponent,
    CadastrarTarefaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule, 
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNgxMask(),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
