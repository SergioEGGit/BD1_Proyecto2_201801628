import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seg-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  displayedColumns = ['no', 'rol' ];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
export interface Element {
  rol: string;
  no: number;

}

const ELEMENT_DATA: Element[] = [
  {no: 1, rol: 'Vendedor'},
  {no: 2, rol: 'Encargado'},
  {no: 3, rol: 'Bodeguero'},

];
