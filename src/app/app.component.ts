import {  Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'kt-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'kanban-training-2';

  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
   
  }
}
