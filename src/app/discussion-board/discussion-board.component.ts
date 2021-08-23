import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-discussion-board',
  templateUrl: './discussion-board.component.html',
  styleUrls: ['./discussion-board.component.css']
})


export class DiscussionBoardComponent implements OnInit {

  users: User[] = [];

  constructor(private location: Location, private elementRef:ElementRef, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  goBack = (): void => {
    this.location.back();
  }

  getUsers = (): void => {
    this.userService.getUsers().subscribe(users => this.users = JSON.parse((users as unknown) as string));
  }

  likes = (email: string): void => {
    for(let user of this.users) {
      if(user.email === email) {
        user.likes ++;
        this.userService.addLikes(user).subscribe();
        break;
      }
    }
  }

  unlikes = (email: string): void => {
    for(let user of this.users) {
      if(user.email === email) {
        user.unlikes ++;
        this.userService.addUnlikes(user).subscribe();
      }
    }
  }
}
