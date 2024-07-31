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
import { MatOptionModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpLoadingInterceptor } from './core/interceptor/http-request-interceptor';
import { RealizarCadastroComponent } from './pages/login/realizar-cadastro/realizar-cadastro.component';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
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
import { CompromissosAlunoComponent } from './pages/aluno/compromissos-aluno/compromissos-aluno.component';
import { EnviarTarefaAlunoComponent } from './pages/aluno/tarefa-aluno/enviar-tarefa-aluno/enviar-tarefa-aluno.component';
import { MenuProfessorComponent } from './shared/pages/sidenav/menu-professor/menu-professor.component';
import { MenuOrientadorComponent } from './shared/pages/sidenav/menu-orientador/menu-orientador.component';
import { MenuCoordenadorComponent } from './shared/pages/sidenav/menu-coordenador/menu-coordenador.component';
import { AdicionarProjetoComponent } from './pages/projetos/adicionar-projeto/adicionar-projeto.component';
import { ProjetosOrientadorComponent } from './pages/projetos/projetos-orientador/projetos-orientador.component';
import { MeusAlunosComponent } from './pages/orientador/meus-alunos/meus-alunos.component';
import { EditarAlunosOrientadosComponent } from './pages/orientador/meus-alunos/editar-alunos-orientados/editar-alunos-orientados.component';
import { RecomendarBancaComponent } from './pages/orientador/meus-alunos/recomendar-banca/recomendar-banca.component';


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
    CompromissosAlunoComponent,
    EnviarTarefaAlunoComponent,
    MenuProfessorComponent,
    MenuOrientadorComponent,
    MenuCoordenadorComponent,
    AdicionarProjetoComponent,
    ProjetosOrientadorComponent,
    MeusAlunosComponent,
    EditarAlunosOrientadosComponent,
    RecomendarBancaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
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
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoadingInterceptor,
    multi: true,
  },
  provideNgxMask(),
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
