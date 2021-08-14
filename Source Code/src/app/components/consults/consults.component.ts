import { Component, OnInit } from '@angular/core';
import { Proyecto2Service } from './../../services/proyecto-2.service';

@Component({
  selector: 'seg-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.scss']
})
export class ConsultsComponent implements OnInit {

	// Columnas 
	displayedColumns = [];	
	ELEMENT_DATA: any;
	dataSource;	
	
	constructor(private proyecto2Service: Proyecto2Service) {  }

	ngOnInit(): void {
		
		// Lamar Peticion Consulta 
		this.GetConsultas(localStorage.getItem("consulta"));

	}
	
	// Conseguir Consultas 
	GetConsultas(Tipo: string) {
		
		// Consultas			
		this.proyecto2Service.getConsulta(Tipo).subscribe(
	
			// Resultado 
			Result => {
				
				// Mostrar Resultado
				if(Result[0] != null) {
					
					this.displayedColumns = Object.keys(Result[0]);
					this.ELEMENT_DATA = Result;
					this.dataSource = this.ELEMENT_DATA;	
					
				}
				else 
				{
					
					this.displayedColumns = ["Nombre_IN"];
					this.ELEMENT_DATA = [{Nombre_IN: "-"}];
					this.dataSource = this.ELEMENT_DATA;		
					
				}				
			
			},
			
			// Error
			Error => {
				
				// Mostrar Error 
				console.log(Error);
				
			}
			
		);
		
	}
 
}