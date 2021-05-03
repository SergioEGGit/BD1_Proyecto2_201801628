import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'seg-priviliges',
  templateUrl: './priviliges.component.html',
  styleUrls: ['./priviliges.component.scss']
})
export class PriviligesComponent implements OnInit {

  displayedColumns = ['no', 'rol', 'accion', 'priviliges'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Element {
  rol: string;
  no: number;
  accion: string;
  priviliges: string;
}

const ELEMENT_DATA: Element[] = [
  {no: 1, rol: 'Vendedor', accion: 'Registrar clientes', priviliges: 'No'},
  {no: 2, rol: 'Vendedor', accion: 'Registrar ventas', priviliges: 'Si'},
  {no: 3, rol: 'Bodeguero', accion: 'Actualizar inventarios', priviliges: 'Si'},

];
