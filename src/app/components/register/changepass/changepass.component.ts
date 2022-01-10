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
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: number | undefined; }) => (this.id = params['uId'])); // fiction
  }

  reset(value: any) {
    const changePassDto: any = {};
    changePassDto.UserId = this.id;
    changePassDto.UPassword = value.UPassword;
    console.log(changePassDto);
    this.authService.updatePass(changePassDto).subscribe((res: any) => {
      console.log('success');
      this.router.navigate(['']);
    });
  }
}
