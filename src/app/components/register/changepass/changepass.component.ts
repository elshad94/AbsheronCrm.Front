import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
})
export class ChangepassComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  public id?: number;
  public submitted: boolean=false;
  public checkPsw:boolean=false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: number | undefined; }) => (this.id = params['uId'])); // fiction
  }

  reset(value: any) {

    const changePassDto: any = {};
    changePassDto.UserId = this.id;
    changePassDto.UPassword = value.UPassword;
    this.authService.updatePass(changePassDto).subscribe((res: any) => {
      this.router.navigate(['']);
    });
  }
}
