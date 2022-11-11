import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onButtonChange(value: string) {
    if (value === 'login') this.authService.isLogin = true;
    else this.authService.isLogin = false;
  }
}
