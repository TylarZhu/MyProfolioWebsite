import { Component, OnInit } from '@angular/core';
import { faCode as fasCode } from '@fortawesome/pro-duotone-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  users: User[] = [];
  user: User;

  lat = 51.678418;
  lng = 7.809007;

  constructor(library: FaIconLibrary, private userService: UserService) {
    library.addIcons(fasCode);
    this.user = {firstname: "", lastname: "", email: "", comment: "", likes: 0, unlikes: 0};
  }

  ngOnInit(): void {
  }

  submit = (firstName: string, lastName: string, email: string, comment: string): void => {
    this.user.firstname = firstName;
    this.user.lastname = lastName;
    this.user.email = email;
    this.user.comment = comment;
    this.userService.addUser(this.user).subscribe((user) => this.users.push(user));
  }

}
