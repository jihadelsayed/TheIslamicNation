import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// ng ----- Matriall

///forms
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

///http request api request
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//notification api jeson
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { httpInterceptor } from 'src/interceptor/http-interceptor';
import { SelectionLoaderModule } from './selection-loader/selection-loader.module';
import { UserService } from 'src/services/auth/user.service';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { ChatService } from 'src/services/websocket/chat.service';
import { WebsocketService } from 'src/services/websocket/websocket.service';
import { SearchService } from 'src/services/search/search.service';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MuslimsComponent } from './muslims/muslims.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    SignInComponent,
    SpinnerComponent,
    MuslimsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // FlexLayoutModule,
    SelectionLoaderModule,
    // AvatarModule,
    // StripeModule.forRoot(""),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [UserService,AuthGuard,ChatService,WebsocketService,SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
