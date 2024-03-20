import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { datamodel } from '../../list/list/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {



  indianStates = ["",
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  
  Countries = [
    "India", "China", "United States", "Japan", "Brazil",
    "France", "Italy", "Canada", "Australia", "Russia",
    "Germany", "United Kingdom", "Mexico", "South Africa", "Spain"
  ];

  public dataid!: number;
  public updateForm!: FormGroup;
  public DATAA!: datamodel; // Data to pre-populate the form

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {  


    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']("id"); // Corrected bracket notation

      // Fetch data using dataid and store in DATAA
      this.api.facth(this.dataid).subscribe((data: datamodel) => {
        this.DATAA = data;
        console.log(this.DATAA);
        
        this.updateForm = this.createFormGroup(this.DATAA); // Initialize form with fetched data
      });
    });
  }

  createFormGroup(data: any): FormGroup {
    return this.formBuilder.group({
      firstname: [data.firstname, Validators.required],
       lastname: [data.lastname],
      email: [data.email],
      age:[data.age],
      dob: [data.dob],
      number: [data.number],
      gender: [data.gender],
      currentaddress:[data.currentaddress],
      currentaddress2:[data.currentaddress2],
      city:[data.city],
      
      selectState:[data.selectState],
      postalCode:[data.postalCode],
      country:[data.country],
      Course: [data.Course],
      comments: [data.comments], 
    });
  }

  update() {
    if (this.updateForm.valid) {
      const updatedData = this.updateForm.value; // Get updated form data
      this.api.update(this.dataid, updatedData).subscribe((res: datamodel) => {

        this.router.navigate(["/"]); // Redirect on successful update (adjust as needed)
      });
    } else {
      console.error("Form is invalid!");
    }
  }
}