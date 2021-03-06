import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee-model';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-http-calls',
  templateUrl: './http-calls.component.html',
  styleUrls: ['./http-calls.component.css']
})
export class HttpCallsComponent implements OnInit {
  emps: EmployeeModel[];
  eno: number;
  emp: EmployeeModel;
  constructor(private httpClient: HttpClient) { }


  ngOnInit() {
    this.getEmployees().subscribe(v => {
      this.emps = v;
    })
  }
  getPosts() {
    // var getApi = this.httpClient.get("https://jsonplaceholder.typicode.com/posts1");
    // getApi.subscribe(
    //   posts => { console.log(posts); },
    //   err => { console.log("Error funcation"); console.log(err); },
    //   () => { console.log("Completed") });

    var getApi = this.httpClient.get("https://jsonplaceholder.typicode.com/posts").pipe(catchError((err) => {
      console.log("Errror");
      console.log(err);
      return Observable.throw(err);
    }));

    getApi.subscribe(posts => { console.log(posts); });
    //  this.httpClient.get("https://jsonplaceholder.typicode.com/posts").subscribe(v=>{

    //   console.log(v);
    // });
  }

  getEmp() {
    this.getEmployee(this.eno).subscribe(v => {
      this.emp = v as EmployeeModel;
    })
  }

  getEmployees(): Observable<EmployeeModel[]> {
    // this.httpClient.get("http://localhost:50093/api/employee").subscribe(v=>{
    // })

    var obser = this.httpClient.get("http://localhost:50093/api/employee");
    return obser.pipe(map(v => v as EmployeeModel[]));
  }
  getEmployee(eno: number): Observable<object> {
    return this.httpClient.get("http://localhost:50093/api/employee/" + eno);
  }
  postEmployee(emp: EmployeeModel): Observable<any> {
    emp.Address = "BTM";
    emp.Age = 34;
    emp.Ename = "Post Emp";
    emp.Eno = 5040;
    emp.Qualification = "BE";
    emp.Salary = 50000;

    return this.httpClient.post("http://localhost:50093/api/employee", emp)
  }

  postEmp() {
    this.postEmployee(new EmployeeModel()).subscribe(v => {
      console.log(v);
      console.log("Posted successfully");
    });
  }

}
