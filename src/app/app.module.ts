import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { InscriptionGroupeComponent } from './components/inscription-groupe/inscription-groupe.component';
import { InscriptionProfComponent } from './components/inscription-prof/inscription-prof.component';
import { NavNewComponent } from './components/nav-new/nav-new.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { TestComponent } from './components/test/test.component';
import { MesSujetsComponent } from './components/mes-sujets/mes-sujets.component';
import { MesGroupesComponent } from './components/mes-groupes/mes-groupes.component';
import { ChefComponent } from './components/chef/chef.component';
import { NotreGroupeComponent } from './components/notre-groupe/notre-groupe.component';
import { ChatComponent } from './components/chat/chat.component';
// import { ReactiveFormsModule } from '@angular/forms';
import {MessagesComponent} from './components/messages/messages.component';
import{ListUserComponent} from './components/list-user/list-user.component';
import{ChatHomeComponent} from './components/chat-home/chat-home.component';
import { AffichePfeComponent } from './components/affiche-pfe/affiche-pfe.component';
import { ListPfeComponent } from './components/list-pfe/list-pfe.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    InscriptionGroupeComponent,
    InscriptionProfComponent,
    NavNewComponent,
    ConnexionComponent,
    TestComponent,
    MesSujetsComponent,
    MesGroupesComponent,
    ChefComponent,
    NotreGroupeComponent,
    ChatComponent,
    MessagesComponent,
    ListUserComponent,
    ChatHomeComponent,
    AffichePfeComponent,
    ListPfeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // FormGroup,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
    //   { path: 'home', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      { path: 'connexion', component: ConnexionComponent},
      { path: 'inscription-groupe', component: InscriptionGroupeComponent },
      { path: 'inscription-prof', component:InscriptionProfComponent },
      { path: 'mes-sujets', component:MesSujetsComponent },
      { path: 'chef', component:ChefComponent },
      { path: 'mes-groupes', component:MesGroupesComponent },
      { path: 'notre-groupe', component:NotreGroupeComponent },
      { path: 'notre-groupe', component:NotreGroupeComponent },

  ])],
  providers: [{
    provide: InjectableRxStompConfig,
    useValue: myRxStompConfig
  },
  {
    provide: RxStompService,
    useFactory: rxStompServiceFactory,
    deps: [InjectableRxStompConfig]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
