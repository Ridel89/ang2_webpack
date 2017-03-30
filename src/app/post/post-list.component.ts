import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPTestService } from '../services/test.service';

@Component({
    selector: 'post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.css']
})

export class PostListComponent {
    private posts: any[] = [];

    constructor(private tstService: HTTPTestService,
                private router: Router) {}

    public ngOnInit() {
        this.getSurvList();
    }

    public getSurvList() {
        this.tstService.getPosts()
            .subscribe((posts) => {
                this.posts = posts;
            });
    }

}
