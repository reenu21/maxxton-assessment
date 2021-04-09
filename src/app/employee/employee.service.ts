import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  getEmployees(): Employee[] {
    let x= [
      {"id": 11, "name": "Ash","department": "Finance","joiningDate": "8 / 10 / 2016"},
      { "id": 12, "name": "John", "department": "HR", "joiningDate": "18 / 1 / 2011" },
      { "id": 13, "name": "Zuri", "department": "Operations", "joiningDate": "28 / 11 / 2019" },
      { "id": 14, "name": "Vish", "department": "Development", "joiningDate": "7 / 7 / 2017" },
      { "id": 15, "name": "Barry", "department": "Operations", "joiningDate": "19 / 8 / 2014" },
      { "id": 16, "name": "Ady", "department": "Finance", "joiningDate": "5 / 10 / 2014" },
      { "id": 17, "name": "Gare", "department": "Development", "joiningDate": " 6 / 4 / 2014" },
      { "id": 18, "name": "Hola", "department": "Development", "joiningDate": "8 / 12 / 2010" },
      { "id": 19, "name": "Ola", "department": "HR", "joiningDate": "7 / 5 / 2011" },
      { "id": 20, "name": "Kim", "department": "Finance", "joiningDate": "20 / 10 / 2010" }]

      // x.map((employee)=>{
      //   employee.joiningDate = new Date().toDateString();
      // })
      return x;
  }


}
