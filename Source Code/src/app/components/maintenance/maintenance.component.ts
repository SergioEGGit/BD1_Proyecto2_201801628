import { Component, OnInit, ViewChild } from '@angular/core';
import { Proyecto2Service } from './../../services/proyecto-2.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'seg-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})

export class MaintenanceComponent implements OnInit {

  columnas: string[] = [];
  
  headers: string[] = [];
  
  datos: any;
  
  ArrayAgregar: any;
  
  ArrayInventores = [];

  @ViewChild(MatTable) tabla1: MatTable<any>;

  constructor(private proyecto2Service: Proyecto2Service, private r : Router) { }

	ngOnInit(): void {
		  
		// Lamar Peticion Consulta 
		this.GetConsultas(localStorage.getItem("consulta"));	
		  
	}
  
  // Conseguir Consultas 
	async GetConsultas(Tipo: string) {
				
		// Consultas			
		await this.proyecto2Service.getConsulta(Tipo).subscribe(
	
			// Resultado 
			Result => {
				
				// Mostrar Resultado
				if(Result[0] != null) {
					
					this.columnas = Object.keys(Result[0]);					
					this.headers = Object.keys(Result[0]);
					this.headers.push("Modificar");
					this.datos = Result;	
					
				}
				else 
				{
					
					this.columnas = [];					
					this.headers = [];
					this.datos = [];			
					
				}				
			
			},
			
			// Error
			Error => {
				
				// Mostrar Error 
				console.log(Error);
				
			}
			
		);		
		
		await this.proyecto2Service.getConsulta("inventores").subscribe(
		
			Result => {
				
				for(let i = 0; i < Object.keys(Result).length; i++) {
					
					this.ArrayInventores.push(Result[i]["nombre_iv"]);					
					
				}
				
			},

			Error => {
				
				
				
			}
		
		);		
		
	}	
	
	// Modificar
	async modificar(Codigo: number) {
		
		// Verificar Tipo 
		if(localStorage.getItem("consulta") == "inventado") {
			
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];
		
			let ArrayInvento;
			
			await this.proyecto2Service.getOneInvento(BodyJson["invento"]).subscribe(
			
				Result => {
					
					ArrayInvento = Result;	
								
				},
				
				Error => {
					
					
					
					
				}
			
			
			);
			
			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Desea Cambiar El Inventor?',
			  text: BodyJson["inventor"],
			  icon: 'question',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Cambiar'
			}).then((result) => {
			  if (result.isConfirmed) {
				return "si";
			  }
			  else {				  
				return "no";				  
			  }
			});

			let Inventor_1;

			if(Value == "si") {
				
				// Combobox 
				Inventor_1 = await Swal.fire({
					title: 'Seleccione Una Inventor',
					input: 'select',
					inputValue: BodyJson["inventor"],
					inputOptions: {
						'Inventores': this.ArrayInventores
					},				
					inputPlaceholder: 'Seleccione Una Opción',
					showCancelButton: true
				});
				
			}
			else 
			{
				
				for(var Key in this.ArrayInventores) {
					
					// Verificar 
					if(this.ArrayInventores[Key] == BodyJson["inventor"]) {
						
						Inventor_1 = { value: Key };
						
					}					
					
				}
				
			}	
			
			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1', '2']
			
			}).queue([
						  {
							title: 'Invento',
							text: 'Ingrese Un Nombre',
							inputValue: (ArrayInvento[0])["Nombre_IN"]							
						  },
						  {
							title: 'Año',
							text: 'Ingrese El Año De Invención',
							inputValue: (ArrayInvento[0])["Anio_IN"]
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});

			// Agregar Region 
			let Inventor = this.ArrayInventores[Inventor_1.value];
			
			await this.proyecto2Service.getOneInventor(Inventor).subscribe(
			
				Result => {
					
					let BodyJson_1 = {
						
						Id_PA_IN: (ArrayInvento[0])["Id_PA_IN"],
						Nombre_IN: (this.ArrayAgregar["value"])[0],
						Anio_IN: (this.ArrayAgregar["value"])[1]
						
					}
				
					let BodyJson_2 = {
						
						Id_IN_IT: (ArrayInvento[0])["Id_IN"],
						Id_IV_IT: (Result[0])["id"]
						
					}
				
					// Agregar Cambio A Invento 
					this.proyecto2Service.PutInvento((ArrayInvento[0])["Id_IN"], BodyJson_1).subscribe(
							
						Result => {
							
							if(Result) {								
								
								this.proyecto2Service.PutInventado(BodyJson["id"], BodyJson_2).subscribe(
								
									Result => {
										
										if(Result) {
											
												// Mesanje
											Swal.fire({

											  icon: 'success',
											  text: "Inventor Modificado Con Exito!",
											  showConfirmButton: false,
											  timer: 3000
											});
											
											// Valor		
											this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/maintenance']));
														
										}
										else 
										{
											
											// Mesanje
											Swal.fire({

											  icon: 'error',
											  text: "Error Al Modificar El Invento",
											  showConfirmButton: false,
											  timer: 3000
											});									
											
										}
										
									},
									
									Error => {
										
										
										
									}							
								
								
								);
								
								
								
								
							}	
							else 
							{
								
								// Mesanje
								Swal.fire({

								  icon: 'error',
								  text: "Error Al Modificar El Invento",
								  showConfirmButton: false,
								  timer: 3000
								});
								
							}
							
						}
					
					);
					
				},
				
				Error => {
					
					
					
				}
			
			);			
					
		} else if(localStorage.getItem("consulta") == "correctas") {
			
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];
		
			let ArrayRespuestas = [];
			
			await this.proyecto2Service.getRespuestas(BodyJson["pregunta"]).subscribe(
			
				Result => {
					
					for(let i = 0; i < Object.keys(Result).length; i++) {
					
						ArrayRespuestas.push(Result[i]["respuesta"]);					
					
					}
								
				},
				
				Error => {
					
					
					
					
				}
			
			
			);		

			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Desea Cambiar La Respuesta Correcta?',
			  text: BodyJson["respuesta"],
			  icon: 'question',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Cambiar'
			}).then((result) => {
			  if (result.isConfirmed) {
				return "si";
			  }
			  else {				  
				return "no";				  
			  }
			});

			let Respuesta;

			if(Value == "si") {
				
				// Combobox 
				Respuesta = await Swal.fire({
					title: 'Seleccione Una Respuesta',
					input: 'select',
					inputValue: BodyJson["respuesta"],
					inputOptions: {
						'Respuestas': ArrayRespuestas
					},				
					inputPlaceholder: 'Seleccione Una Opción',
					showCancelButton: true
				});
				
			}
			else 
			{
				
				Respuesta = { value: BodyJson["respuesta"] };
				
			}	
			
			let BuscarRespuesta;
				
			if(Number(Respuesta.value)) 
			{
			
				BuscarRespuesta = ArrayRespuestas[Respuesta.value];	
			
			}
			else 
			{
				
				BuscarRespuesta = Respuesta.value;
				
			}
			
			await this.proyecto2Service.getIdRespuesta(BodyJson["id_pregunta"], BuscarRespuesta).subscribe(
			
			
				Result => {
					
					let BodyJson_1 = {
						
						Id_RS_RC: (Result[0])["id"],
						Id_PG_RC: BodyJson["id_pregunta"]					
						
					}					
					
					this.proyecto2Service.PutRespuestaCorrecta(BodyJson["id"], BodyJson_1).subscribe(
					
						Result => {
							
							if(Result) {
											
								// Mesanje
								Swal.fire({

								  icon: 'success',
								  text: "Respuesta Modificado Con Exito!",
								  showConfirmButton: false,
								  timer: 3000
								});
								
								// Valor		
								this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/maintenance']));
											
							}
							else 
							{
								
								// Mesanje
								Swal.fire({

								  icon: 'error',
								  text: "Error Al Modificar La Repuesta",
								  showConfirmButton: false,
								  timer: 3000
								});									
								
							}							
							
						},
						
						Error => {
							
							
							
						}
					
					);
					
				},
				
				Error => {
					
					
					
				}
			
			
			);
			
		}
		
	}

}
