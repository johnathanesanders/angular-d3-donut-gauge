import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.resize();
  }

  @Input() colors: string[] = [];
  @Input() data: number[] = [];
  @Input() height: number;
  @Input() label: string;
  @Input() labelColor: string = 'rgba(80,80,80,.8)';
  @Input() title: string;
  @Input() width: number;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild('chart') chart: ElementRef<SVGElement>;
  @ViewChild('titleContainer') titleContainer: ElementRef<HTMLDivElement>;
  
  public svg: any;
 
  constructor() { }

  ngAfterViewInit(): void {
      this.resize();
      this.buildChart();
  }

  private buildChart(): void {
    if (this.title) {
      this.titleContainer.nativeElement.innerHTML = this.title;
    }

    this.svg = d3.select(this.chart.nativeElement)
      .append('g')
      .attr('overflow', 'visible')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    const color = d3.scaleOrdinal(this.data, this.colors);

    const arc = d3.arc()
      .innerRadius(Math.min(this.width, this.height) / 3)
      .outerRadius(Math.min(this.width, this.height) / 2)
      .cornerRadius(0);

    const pie = d3.pie()
      .value((d:any) => d);

    const path = this.svg.selectAll('path')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', <any>arc)
      .attr('fill', (d:any) => color(d))
      .attr('stroke', 'none');
    
    if (this.label) {
      this.svg.append('text')
        .attr('alignment-baseline', 'middle')
        .attr('class', 'chart-label')
        .attr('fill', this.labelColor)
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', 0)
        .text(`${this.label}`);
    }
  }

  private resize(): void {
    this.height = (this.height && !isNaN(this.height) && this.height > 0) ? this.height : this.container.nativeElement.parentElement.parentElement.offsetHeight;
    this.width = (this.width && !isNaN(this.width) && this.width > 0) ? this.width : this.container.nativeElement.parentElement.parentElement.offsetWidth;
      
    this.chart.nativeElement.style.height = `${this.height}px`;
    this.container.nativeElement.style.height = `${this.height}px`;
    this.chart.nativeElement.style.width = `${this.width}px`;
    this.container.nativeElement.style.width = `${this.width}px`;
  }

}
