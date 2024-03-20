import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  hobbiesArray: string[] = ['Reading', 'Traveling', 'Cooking', 'Gardening'];
  selectedHobbies: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleHobby(event: any, hobby: string) {
    if (event.target.checked) {
      this.selectedHobbies.push(hobby);
    } else {
      this.selectedHobbies = this.selectedHobbies.filter(item => item !== hobby);
    }
  }

  submit() {
    // Handle the submission logic here, such as sending data to a server or processing it locally
    console.log("Selected Hobbies:", this.selectedHobbies);
  }
}
