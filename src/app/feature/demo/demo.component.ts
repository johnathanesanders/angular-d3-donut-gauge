import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements AfterViewInit {

  public data: number[] = [88,12];

  constructor() { }
  
  ngAfterViewInit(): void {}

}
