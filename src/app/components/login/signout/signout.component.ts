import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
      this.authService.logout().subscribe(res =>{
        localStorage.removeItem("token");
        localStorage.removeItem("Userid");
        localStorage.removeItem("Username");
        this.router.navigate([""])
      })
  }

}
