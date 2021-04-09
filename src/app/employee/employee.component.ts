import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  showSortByNameAsec: boolean = true;
  showSortByNameDsec: boolean = true;
  showSortByJoiningDateAsec: boolean = true;
  showSortByJoiningDateDsec: boolean = true;
  nonDevelopment: boolean = false;
  moreThanTwoYears:boolean = false;
  searchText:string="";
  departments :any[]=[];
  departmentWithCount:any[]=[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
    this.departments = [... new Set(this.employees.map(employee => employee.department))];
    for(let i = 0;i<this.departments.length;i++){
      let count =0;
      for (let j = 0; j < this.employees.length; j++) {
        if(this.employees[j].department === this.departments[i]){
          count++;
        }
      }
      this.departmentWithCount.push({name:this.departments[i],count});
    }
    console.log(this.departments,this.departmentWithCount);
    this.employees.forEach((employee)=>{
      // if(this.departments.has(employee.department)){

      // }
    })

  }
  searchEmployeeByName() {
    if (this.searchText === "") {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter((employee) => {
        return employee.name.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
  }

  sortEmployeesByNameAsec() {
    this.filteredEmployees.sort((a, b) => {
      return (a.name > b.name ? 1 : -1);
    })
    this.showSortByNameAsec = false;
    this.showSortByNameDsec = true;
    this.showSortByJoiningDateDsec = true;
    this.showSortByJoiningDateAsec = true;
  }
  sortEmployeesByNameDsec() {
    this.filteredEmployees.sort((a, b) => {
      return (a.name > b.name ? -1 : 1);
    })
    this.showSortByNameDsec = false;
    this.showSortByNameAsec = true;
    this.showSortByJoiningDateDsec = true;
    this.showSortByJoiningDateAsec = true;
  }
  sortEmployeesByJoiningDateAsec() {
    this.filteredEmployees.sort((a, b) => {
      const date1 = moment(a.joiningDate,'DD\MM\YYYY');
      const date2 = moment(b.joiningDate,'DD\MM\YYYY');
      return (date1 > date2 ? 1 : -1);
    })
    this.showSortByJoiningDateAsec = false;
    this.showSortByJoiningDateDsec = true;
    this.showSortByNameAsec = true;
    this.showSortByNameDsec = true;
  }
  sortEmployeesByJoiningDateDsec() {
    this.filteredEmployees.sort((a, b) => {
      const date1 = moment(a.joiningDate,'DD\MM\YYYY');
      const date2 = moment(b.joiningDate,'DD\MM\YYYY');
      return (date1 > date2 ? -1 : 1);
    })
    this.showSortByJoiningDateDsec = false;
    this.showSortByJoiningDateAsec = true;
    this.showSortByNameAsec = true;
    this.showSortByNameDsec = true;
  }

  toggleDepartment() {
    this.nonDevelopment = !this.nonDevelopment;
    this.applyFilters();

  }
  toggleExperience(){
    this.moreThanTwoYears = !this.moreThanTwoYears;
    this.applyFilters();
  }
  filterDepartment(){
      this.filteredEmployees = this.filteredEmployees.filter((employee) => {
        return employee.department.toLocaleLowerCase() != 'development'
      })

  }

  filterExperienceMoreThanTwoYear(){

    this.filteredEmployees = this.filteredEmployees.filter((employee)=>{
      const empDateArray =employee.joiningDate.split("/");
      const empDate = new Date(empDateArray[1]+'/'+empDateArray[0]+'/'+empDateArray[2])
      const empJoiningDate = moment(employee.joiningDate,"DDMMYYYY");
      const today = moment(new Date());
      var diffDays = today.diff(empJoiningDate, 'years');
      if(diffDays > 2){
        return true;
      }
      return false;
    })
  }

  applyFilters(){
    this.filteredEmployees = this.employees;
    if (!this.showSortByNameAsec) {
      this.sortEmployeesByNameAsec();
    } else if (!this.showSortByNameDsec) {
      this.sortEmployeesByNameDsec();
    } else if (!this.showSortByJoiningDateAsec) {
      this.sortEmployeesByJoiningDateAsec();
    } else if (!this.showSortByJoiningDateDsec) {
      this.sortEmployeesByJoiningDateDsec();
    }
    if(this.searchText){
      this.searchEmployeeByName();
    }
    if(this.nonDevelopment){
      this.filterDepartment();
    }

    if(this.moreThanTwoYears){
      this.filterExperienceMoreThanTwoYear();
    }


  }
}
