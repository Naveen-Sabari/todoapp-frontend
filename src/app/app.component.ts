// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { tasks } from './tasks/tasks.component';
import { WebrequestService } from './webrequest.service'
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [tasks, CommonModule, NgIf, FormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Your App Title';
    tasks: any[] = [];
    edit: boolean = false;
    editTask: any = {};

    constructor(private webrequest: WebrequestService) { }

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks(): void {
        this.webrequest.get('tasks').subscribe(
            (res: any) => {
                this.tasks = res;
             
            },
            (error: any) => {
                
            }
        );
    }

    addTask(task: any): void {
        this.webrequest.post('tasks', task).subscribe(
            (res: any) => {
              
                this.getTasks();
            },
            (error: any) => {
               
            }
        );
    }

    handleDelete(task: any): void {
        this.webrequest.delete('tasks/' + task._id, {}).subscribe(
            (res: any) => {
           
                this.getTasks();
            },
            (error: any) => {
               
            }
        );
    }

    handleEdit(task: any): void {
        this.edit = true;

        this.editTask = task;
        
    }

    handleComplete(task: any): void {
        this.webrequest
            .put('tasks/' + task._id, {
                name: task.name,
                desc: task.desc,
                deadline: task.deadline,
                completed: true,
            })
            .subscribe(
                (res: any) => {
               
                    this.getTasks();
                },
                (error: any) => {
                 
                }
            );
    }

    handleUpdate(task: any): void {
   
        this.edit = false;
        this.webrequest
            .put('tasks/' + task._id, {
                name: task.name,
                desc: task.desc,
                deadline: task.deadline,
            })
            .subscribe(
                (res: any) => {
        
                    this.getTasks();
                },
                (error: any) => {
              
                }
            );
    }
}