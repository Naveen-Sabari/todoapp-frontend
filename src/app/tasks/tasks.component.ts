

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WebrequestService } from '../webrequest.service';
import { CommonModule, NgIf } from '@angular/common';


export @Component({
    selector: 'app-todo-add',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})

class tasks implements OnInit {
    task: any;
    constructor(private webrequest: WebrequestService) {
    }

    ngOnInit(): void {
        this.handleChange();
    }

    name: string = '';
    desc: string = "";
    deadline: string = new Date().toDateString();
    disable: boolean = true;
    @Output() todoAdd: EventEmitter<any> = new EventEmitter();

    handleChange() {
        if (this.name.length > 0 && this.desc.length > 0) {
            this.disable = false;
        } else {
            this.disable = true;
        }
    }

    handleSubmit() {
      

        this.todoAdd.emit({
            name: this.name,
            desc: this.desc,
            deadline: this.deadline
        } as any)
        this.name = "";
        this.desc = "";
        this.deadline = new Date().toDateString();
        this.handleChange();
    }

}