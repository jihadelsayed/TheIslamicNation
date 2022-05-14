import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { MuslimsComponent } from './muslims/muslims.component';



const routes: Routes = [
  // { path:'',component: HomeComponent },
  // { path:'search',component: SearchComponent },
  { path:'muslims',component: MuslimsComponent },
  // { path:'chat',component: ChatComponent ,canActivate:[AuthGuard] },
  // { path:'deleteAccount',component: DeleteAccountComponent ,canActivate:[AuthGuard] },
  // { path:'buyservice/:slug',component: BuyServiceComponent ,canActivate:[AuthGuard] },
  // { path:'viewservice/:slug',component: ViewServiceComponent ,canActivate:[AuthGuard] },
  // { path:'complete',component: CompleteComponent,canActivate:[AuthGuard] },
  // { path:'Profile/:username',component: ProfileComponent,canActivate:[AuthGuard]},
  // { path:'addservice',component: AddServiceComponent,canActivate:[AuthGuard]},
  // { path:'editservice/:slug',component: EditServiceComponent ,canActivate:[] },
  // { path:'signup',component: SignUpComponent,canActivate:[NotAuthGuard] },
  // { path:'signin',component: SignInComponent,canActivate:[NotAuthGuard] },
  // { path:'Profile/:username/profileServices',component: ProfileServicesComponent, canActivate:[AuthGuard] },
  // { path:'aboutUs',component: AboutUsComponent},
  // { path:'cookies',component: CookiesComponent},
  // { path:'policy',component: PolicyComponent},
  // { path:'contact',component: ContactComponent},
  // { path:'donate',component: DonateComponent},
  // { path:'vision',component: OurVisionComponent},
  // { path:'register',component: RegisterComponent, canActivate:[AuthGuard]},
  // { path:'CheckoutSuccess',component: CheckoutSuccessPageComponent, canActivate:[AuthGuard]},
  // { path:'CheckoutUnsuccess',component: CheckoutUnsuccessPageComponent, canActivate:[AuthGuard]},
  // { path:'Approved',component: ApprovedPageComponent, canActivate:[AuthGuard]},
  // { path:'orderDetail',component: OrderDetailComponent, canActivate:[AuthGuard]},
  // { path:'**',component: ErrorPageComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
