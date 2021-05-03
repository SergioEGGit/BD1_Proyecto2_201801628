import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { Proyecto2Service } from './../../services/proyecto-2.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'seg-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  columnas: string[] = [];
  
  headers: string[] = [];
  
  datos: any;
  
  ArrayAgregar: any;
  
  Region: any;
  
  Encuesta: any;
  
  ArrayRegiones = [];
  
  ArrayPaises = [];
  
  ArrayEncuestas = [];
  
  Pais_1_Index: any;
  
  Pais_2_Index: any = null;

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
					this.headers.push("Borrar");
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
		
		await this.proyecto2Service.getConsulta("regiones").subscribe(
		
			Result => {
				
				for(let i = 0; i < Object.keys(Result).length; i++) {
					
					this.ArrayRegiones.push(Result[i]["region"]);					
					
				}
				
			},

			Error => {
				
				
				
			}
		
		);
		
		await this.proyecto2Service.getConsulta("paises/nombre").subscribe(
		
			Result => {
				
				for(let i = 0; i < Object.keys(Result).length; i++) {
					
					this.ArrayPaises.push(Result[i]["pais"]);					
					
				}
				
			},

			Error => {
				
				
				
			}
		
		);
		
		await this.proyecto2Service.getConsulta("encuestas").subscribe(
		
			Result => {
				
				for(let i = 0; i < Object.keys(Result).length; i++) {
					
					this.ArrayEncuestas.push(Result[i]["encuesta"]);					
					
				}
				
			},

			Error => {
				
				
				
			}
		
		);
		
	}	

	// Agregar 
	async agregar() {
		
		// Verificar Tipo 
		if(localStorage.getItem("consulta") == "paises") {
			
			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1', '2', '3', '4']
			
			}).queue([
						  {
							title: 'País',
							text: 'Ingrese Un Nombre'
						  },
						  {
							title: 'Población',
							text: 'Ingrese La Cantidad'
						  },
						  {
							title: 'Area',
							text: 'Ingrese El Area En Km2'
						  },
						  {
							title: 'Capital',
							text: 'Ingrese La Capital'
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});

			// Combobox 
			const Region = await Swal.fire({
				title: 'Seleccione Una Región',
				input: 'select',
				inputOptions: {
					'Regiones': this.ArrayRegiones
				},
				inputPlaceholder: 'Seleccione Una Opción',
				showCancelButton: true
			});
			
			if(Region) {
							
				if(Region.isDismissed || Region.value == "" || Region.isDenied || (this.ArrayAgregar["value"])[1] == "" || (this.ArrayAgregar["value"])[0] == "" || (this.ArrayAgregar["value"])[2] == "" || (this.ArrayAgregar["value"])[3] == "") {
					
					// Mesanje De Error 
					await Swal.fire({

					  icon: 'error',
					  text: "Existe Algun Error En La Informacion Soliticada",
					  showConfirmButton: false,
					  timer: 3000
					});
					
					
				}
				else {
					
					// Agregar Region 
					this.Region = this.ArrayRegiones[Region.value];
					
					// Nuevo Array 
					let BodyJson;
			
					await this.proyecto2Service.getOneRegion(this.Region).subscribe(
					
						// Resultado 
						Result => {
							
							BodyJson = {  

								Id_RE_PA: (Result[0])["id"],
								Nombre_PA: (this.ArrayAgregar["value"])[0],
								Poblacion_PA: (this.ArrayAgregar["value"])[1],
								Area_PA: (this.ArrayAgregar["value"])[2],
								Capital_PA: (this.ArrayAgregar["value"])[3]

							};
							
							this.proyecto2Service.AddPais(BodyJson).subscribe(
							
							
								Result => {
									
									if(Result) {
										
										// Mesanje
										Swal.fire({

										  icon: 'success',
										  text: "Pais Agregado Con Exito!",
										  showConfirmButton: false,
										  timer: 3000
										});
										
										// Valor		
										this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
										
									}	
									else 
									{
										
										// Mesanje
										Swal.fire({

										  icon: 'error',
										  text: "Error Al Agregar El Pais",
										  showConfirmButton: false,
										  timer: 3000
										});
										
									}
									
								}
							
							);
						
						},
						
						// Error
						Error => {
							
							// Mostrar Error 
							console.log(Error);
							
						}
					
					);
					
				}
				
			}	
			
		}
		else if(localStorage.getItem("consulta") == "fronteras") {
			
			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1', '2', '3', '4']
			
			}).queue([
						  {
							title: 'Frontera Por El Norte',
							text: 'Ingrese Si/No'
						  },
						  {
							title: 'Frontera Por El Sur',
							text: 'Ingrese Si/No'
						  },
						  {
							title: 'Frontera Por El Este',
							text: 'Ingrese Si/No'
						  },
						  {
							title: 'Frontera Por El Oeste',
							text: 'Ingrese Si/No'
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});

			// Combobox 
			const Pais_1 = await Swal.fire({
				
				title: 'Seleccione Un Pais',
				input: 'select',
				inputOptions: {
					'Paises': this.ArrayPaises
				},
				inputPlaceholder: 'Seleccione Una Opción',
				showCancelButton: true
			
			});
			
			if(Pais_1) {
							
				if(Pais_1.isDismissed || Pais_1.value == "" || Pais_1.isDenied || (this.ArrayAgregar["value"])[1] == "" || (this.ArrayAgregar["value"])[0] == "" || (this.ArrayAgregar["value"])[2] == "" || (this.ArrayAgregar["value"])[3] == "") {
					
					// Mesanje De Error 
					await Swal.fire({

					  icon: 'error',
					  text: "Existe Algun Error En La Informacion Soliticada",
					  showConfirmButton: false,
					  timer: 3000
					});
					
					
				}
				else 
				{
					
					// Segundo Pais 
					const Pais_2 = await Swal.fire({
						
						title: 'Seleccione Una Frontera',
						input: 'select',
						inputOptions: {
							'Fronteras': this.ArrayPaises
						},
						inputPlaceholder: 'Seleccione Una Opción',
						showCancelButton: true
					
					});
					
					if(Pais_2) {
						
						// Agregar Region 
						this.Pais_1_Index = this.ArrayPaises[Pais_1.value];
						
						// Verificar 
						if(Pais_2.value != null) 
						{
							
							await this.proyecto2Service.getOnePais(this.Pais_1_Index).subscribe(
							
								Result => {
									
									this.Pais_1_Index = (Result[0])["id"];

									if(Pais_2.value == "")
									{
																	
										this.Pais_2_Index = null;
										
									}
									else 
									{
										
										this.Pais_2_Index = this.ArrayPaises[Pais_2.value];	
										
									}

									this.proyecto2Service.getOnePais(this.Pais_2_Index).subscribe(
									
										Result => {
											
											if(Result[0] != null)
											{
												
												this.Pais_2_Index = (Result[0])["id"];	
												
											}
											else 
											{
												
												this.Pais_2_Index = null;
												
											}
											
											let BodyAgregar = {
											
												Id_PA_1_FR: this.Pais_1_Index,
												Id_PA_2_FR: this.Pais_2_Index,
												Norte_FR: (this.ArrayAgregar["value"])[0],
												Sur_FR: (this.ArrayAgregar["value"])[1],
												Este_FR: (this.ArrayAgregar["value"])[2],
												Oeste_FR: (this.ArrayAgregar["value"])[3]
												
											}
											
											this.proyecto2Service.AddFrontera(BodyAgregar).subscribe(
							
							
												Result => {
													
													if(Result) {
														
														// Mesanje
														Swal.fire({

														  icon: 'success',
														  text: "Frontera Agregada Con Exito!",
														  showConfirmButton: false,
														  timer: 3000
														});
														
														// Valor		
														this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
														
													}	
													else 
													{
														
														// Mesanje
														Swal.fire({

														  icon: 'error',
														  text: "Error Al Agregar La Frontera",
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
									
								},

								Error => {
									
									
									
								}
							
							);
							
						}
						else 
						{
						
							// Mesanje De Error 
							await Swal.fire({

							  icon: 'error',
							  text: "Existe Algun Error En La Informacion Soliticada",
							  showConfirmButton: false,
							  timer: 3000
							});		
							
						}
						
					}													
					
				}
				
			}		
			
		}
		else if(localStorage.getItem("consulta") == "preguntas") {
			
			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1']
			
			}).queue([
						  {
							title: 'Pregunta',
							text: 'Ingrese Una Pregunta ¿?'
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});

			// Combobox 
			const Encuesta = await Swal.fire({
				title: 'Seleccione Una Encuesta',
				input: 'select',
				inputOptions: {
					'Encuesta': this.ArrayEncuestas
				},
				inputPlaceholder: 'Seleccione Una Opción',
				showCancelButton: true
			});
			
			if(Encuesta) {
							
				if(Encuesta.isDismissed || Encuesta.value == "" || Encuesta.isDenied || (this.ArrayAgregar["value"])[0] == "") {
					
					// Mesanje De Error 
					await Swal.fire({

					  icon: 'error',
					  text: "Existe Algun Error En La Informacion Soliticada",
					  showConfirmButton: false,
					  timer: 3000
					});					
					
				}
				else {
					
					// Agregar Region 
					this.Encuesta = this.ArrayEncuestas[Encuesta.value];
					
					// Nuevo Array 
					let BodyJson;
			
					await this.proyecto2Service.getOneEncuesta(this.Encuesta).subscribe(
					
						// Resultado 
						Result => {
							
							BodyJson = {  

								Id_EN_PG: (Result[0])["id"],
								Pregunta_PG: (this.ArrayAgregar["value"])[0]

							};
							
							this.proyecto2Service.AddPregunta(BodyJson).subscribe(
							
							
								Result => {
									
									if(Result) {
										
										// Mesanje
										Swal.fire({

										  icon: 'success',
										  text: "Pregunta Agregada Con Exito!",
										  showConfirmButton: false,
										  timer: 3000
										});
										
										// Valor		
										this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
										
									}	
									else 
									{
										
										// Mesanje
										Swal.fire({

										  icon: 'error',
										  text: "Error Al Agregar La Pregunta",
										  showConfirmButton: false,
										  timer: 3000
										});
										
									}
									
								}
							
							);
						
						},
						
						// Error
						Error => {
							
							// Mostrar Error 
							console.log(Error);
							
						}
					
					);
					
				}
				
			}	
			
		}
		
	}

	// Modificar
	async modificar(Codigo: number) {
		
		// Verificar Tipo 
		if(localStorage.getItem("consulta") == "paises") {
			
			// Obtener Cuerpo
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];

			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1', '2', '3', '4']
			
			}).queue([
						  {
							title: 'País',
							text: 'Ingrese Un Nombre',
							inputValue: BodyJson["pais"]
						  },
						  {
							title: 'Población',
							text: 'Ingrese La Cantidad',
							inputValue: BodyJson["poblacion"]
						  },
						  {
							title: 'Area',
							text: 'Ingrese El Area En Km2',
							inputValue: BodyJson["area"]
						  },
						  {
							title: 'Capital',
							text: 'Ingrese La Capital',
							inputValue: BodyJson["capital"]
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});


			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Desea Cambiar La Region?',
			  text: BodyJson["region"],
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

			let Region;

			if(Value == "si") {
				
				// Combobox 
				Region = await Swal.fire({
					title: 'Seleccione Una Región',
					input: 'select',
					inputValue: BodyJson["region"],
					inputOptions: {
						'Regiones': this.ArrayRegiones
					},				
					inputPlaceholder: 'Seleccione Una Opción',
					showCancelButton: true
				});
				
			}
			else 
			{
				
				for(var Key in this.ArrayRegiones) {
					
					// Verificar 
					if(this.ArrayRegiones[Key] == BodyJson["region"]) {
						
						Region = { value: Key };
						
					}					
					
				}
				
			}
			
			if(Region) {
						
				if(Region.isDismissed || Region.value == "" || Region.isDenied || (this.ArrayAgregar["value"])[1] == "" || (this.ArrayAgregar["value"])[0] == "" || (this.ArrayAgregar["value"])[2] == "" || (this.ArrayAgregar["value"])[3] == "") {
					
					// Mesanje De Error 
					await Swal.fire({

					  icon: 'error',
					  text: "Existe Algun Error En La Informacion Soliticada",
					  showConfirmButton: false,
					  timer: 3000
					});
					
					
				}
				else {
					
					// Agregar Region 
					this.Region = this.ArrayRegiones[Region.value];
					
					// Nuevo Array 
					let BodyJson_1;
			
					await this.proyecto2Service.getOneRegion(this.Region).subscribe(
					
						// Resultado 
						Result => {
							
							BodyJson_1 = {  

								Id_RE_PA: (Result[0])["id"],
								Nombre_PA: (this.ArrayAgregar["value"])[0],
								Poblacion_PA: (this.ArrayAgregar["value"])[1],
								Area_PA: (this.ArrayAgregar["value"])[2],
								Capital_PA: (this.ArrayAgregar["value"])[3]

							};
						
							// Modificar 
							this.proyecto2Service.PutPais(BodyJson["id"], BodyJson_1).subscribe(
							
								Result => {
									
									if(Result) {
										
										// Mesanje
										Swal.fire({

										  icon: 'success',
										  text: "Pais Modificado Con Exito!",
										  showConfirmButton: false,
										  timer: 3000
										});
										
										// Valor		
										this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
										
									}	
									else 
									{
										
										// Mesanje
										Swal.fire({

										  icon: 'error',
										  text: "Error Al Modificar El Pais",
										  showConfirmButton: false,
										  timer: 3000
										});
										
									}
									
								}
							
							);
						
						},
						
						// Error
						Error => {
							
							// Mostrar Error 
							console.log(Error);
							
						}
					
					);
					
				}
				
			}	
			
		} else if(localStorage.getItem("consulta") == "fronteras") {
			
			// Obtener Cuerpo
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];

			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1', '2', '3', '4']
			
			}).queue([
						  {
							title: 'Frontera Por El Norte',
							text: 'Ingrese Si/No',
							inputValue: BodyJson["norte"]							
						  },
						  {
							title: 'Frontera Por El Sur',
							text: 'Ingrese Si/No',
							inputValue: BodyJson["sur"]
						  },
						  {
							title: 'Frontera Por El Este',
							text: 'Ingrese Si/No',
							inputValue: BodyJson["este"]
						  },
						  {
							title: 'Frontera Por El Oeste',
							text: 'Ingrese Si/No',
							inputValue: BodyJson["oeste"]
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});

			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Desea Cambiar El Pais?',
			  text: BodyJson["pais"],
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

			let Pais_1;

			if(Value == "si") {
				
				// Primer Pais 
				Pais_1 = await Swal.fire({
					
					title: 'Seleccione Un Pais',
					input: 'select',
					inputOptions: {
						'Fronteras': this.ArrayPaises
					},
					inputPlaceholder: 'Seleccione Una Opción',
					showCancelButton: true
				
				});		
				
			}
			else 
			{
				
				for(var Key in this.ArrayPaises) {
					
					// Verificar 
					if(this.ArrayPaises[Key] == BodyJson["pais"]) {
						
						Pais_1 = { value: Key };
						
					}					
					
				}
				
			}

			// Cambiar Region 			 
			const Value_2 = await Swal.fire({
			  title: 'Desea Cambiar La Frontera?',
			  text: BodyJson["frontera"],
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

			let Pais_2;

			if(Value_2 == "si") {
				
				// Primer Pais 
				Pais_2 = await Swal.fire({
					
					title: 'Seleccione Una Frontera',
					input: 'select',
					inputOptions: {
						'Fronteras': this.ArrayPaises
					},
					inputPlaceholder: 'Seleccione Una Opción',
					showCancelButton: true
				
				});		
				
			}
			else 
			{
				
				for(var Key in this.ArrayPaises) {
					
					// Verificar 
					if(this.ArrayPaises[Key] == BodyJson["frontera"]) {
						
						Pais_2 = { value: Key };
						
					}					
					
				}
				
			}
			
			// AGregar Paises 
			this.Pais_1_Index = this.ArrayPaises[Pais_1.value];	
			
			await this.proyecto2Service.getOnePais(this.Pais_1_Index).subscribe(
							
				Result => {
					
					this.Pais_1_Index = (Result[0])["id"];

					if(Pais_2.value == "")
					{
													
						this.Pais_2_Index = null;
						
					}
					else 
					{
						
						this.Pais_2_Index = this.ArrayPaises[Pais_2.value];	
						
					}

					this.proyecto2Service.getOnePais(this.Pais_2_Index).subscribe(
					
						Result => {
							
							if(Result[0] != null)
							{
								
								this.Pais_2_Index = (Result[0])["id"];	
								
							}
							else 
							{
								
								this.Pais_2_Index = null;
								
							}
							
							let BodyAgregar = {
							
								Id_PA_1_FR: this.Pais_1_Index,
								Id_PA_2_FR: this.Pais_2_Index,
								Norte_FR: (this.ArrayAgregar["value"])[0],
								Sur_FR: (this.ArrayAgregar["value"])[1],
								Este_FR: (this.ArrayAgregar["value"])[2],
								Oeste_FR: (this.ArrayAgregar["value"])[3]
								
							}
							
							// Modificar 
							this.proyecto2Service.PutFrontera(BodyJson["id"], BodyAgregar).subscribe(
							
								Result => {
									
									if(Result) {
										
										// Mesanje
										Swal.fire({

										  icon: 'success',
										  text: "Frontera Modificado Con Exito!",
										  showConfirmButton: false,
										  timer: 3000
										});
										
										// Valor		
										this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
										
									}	
									else 
									{
										
										// Mesanje
										Swal.fire({

										  icon: 'error',
										  text: "Error Al Modificar La Frontera",
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
					
				},

				Error => {
					
					
					
				}
			
			);
			
			
		}
		else if(localStorage.getItem("consulta") == "preguntas") {
			
			// Obtener Cuerpo
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];
			
			// Primeros Datos 
			await Swal.mixin({
				
			  input: 'text',
			  confirmButtonText: 'Siguiente &rarr;',
			  showCancelButton: true,
			  progressSteps: ['1']
			
			}).queue([
						  {
							title: 'Pregunta',
							text: 'Ingrese Una Pregunta ¿?',							
							inputValue: BodyJson["pregunta"]
						  }
						]).then((result) => {
							
								if (result) {
								  
									this.ArrayAgregar = result;							
							  
								}
						});
						
			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Desea Cambiar La Encuesta?',
			  text: BodyJson["encuesta"],
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

			let Encuesta;

			if(Value == "si") {
				
				// Combobox 
				Encuesta = await Swal.fire({
					title: 'Seleccione Una Encuesta',
					input: 'select',
					inputOptions: {
						'Encuesta': this.ArrayEncuestas
					},
					inputPlaceholder: 'Seleccione Una Opción',
					showCancelButton: true
				});	
				
			}
			else 
			{
				
				for(var Key in this.ArrayEncuestas) {
					
					// Verificar 
					if(this.ArrayEncuestas[Key] == BodyJson["encuesta"]) {
						
						Encuesta = { value: Key };
						
					}					
					
				}
				
			}		
			
			if(Encuesta) {
							
				if(Encuesta.isDismissed || Encuesta.value == "" || Encuesta.isDenied || (this.ArrayAgregar["value"])[0] == "") {
					
					// Mesanje De Error 
					await Swal.fire({

					  icon: 'error',
					  text: "Existe Algun Error En La Informacion Soliticada",
					  showConfirmButton: false,
					  timer: 3000
					});					
					
				}
				else {
					
					// Agregar Region 
					this.Encuesta = this.ArrayEncuestas[Encuesta.value];
					
					// Nuevo Array 
					let BodyJson_1;
			
					await this.proyecto2Service.getOneEncuesta(this.Encuesta).subscribe(
					
						// Resultado 
						Result => {
							
							BodyJson_1 = {  

								Id_EN_PG: (Result[0])["id"],
								Pregunta_PG: (this.ArrayAgregar["value"])[0]

							};
						
							this.proyecto2Service.PutPregunta(BodyJson["id"], BodyJson_1).subscribe(
							
							
								Result => {
									
									if(Result) {
										
										// Mesanje
										Swal.fire({

										  icon: 'success',
										  text: "Pregunta Modificada Con Exito!",
										  showConfirmButton: false,
										  timer: 3000
										});
										
										// Valor		
										this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
										
									}	
									else 
									{
										
										// Mesanje
										Swal.fire({

										  icon: 'error',
										  text: "Error Al Modificar La Pregunta",
										  showConfirmButton: false,
										  timer: 3000
										});
										
									}
									
								}
							
							);
						
						},
						
						// Error
						Error => {
							
							// Mostrar Error 
							console.log(Error);
							
						}
					
					);
					
				}
				
			}	
			else 
			{
				
				// Valor		
				this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));	
				
			}
			
		}
		
	}

	// ELiminar 
	async eliminar(Codigo: number) {
		
		// Verificar Tipo 
		if(localStorage.getItem("consulta") == "paises") {
			
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];
			
			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Esta Seguro Que Desea Eliminar El Pais?',
			  text: BodyJson["pais"],
			  icon: 'question',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Eliminar'
			}).then((result) => {
			  if (result.isConfirmed) {
				return "si";
			  }
			  else {				  
				return "no";				  
			  }
			});

			if(Value == "si") {
				console.log(BodyJson);
				// Llamar AL Servicio 
				this.proyecto2Service.DeletePais(BodyJson["id"].trim(' ')).subscribe(				
				
					// Resultado 
					Result => {
						
						if(Result) {
							
							// Mesanje
							Swal.fire({

							  icon: 'success',
							  text: "Pais Eliminado Con Exito!",
							  showConfirmButton: false,
							  timer: 3000
							});
							
							// Valor		
							this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
							
						}	
						else 
						{
							
							// Mesanje
							Swal.fire({

							  icon: 'error',
							  text: "Error Al Eliminar El Pais",
							  showConfirmButton: false,
							  timer: 3000
							});
							
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
		else if(localStorage.getItem("consulta") == "fronteras") {
			
			// Obtener Cuerpo
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];
			
			let Frontera;
		
			if(BodyJson["frontera"] == null) 
			{

				Frontera = "-";

			} 
			else 
			{
				
				Frontera = BodyJson["frontera"];
				
			}
			
			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Esta Seguro Que Desea Eliminar La Frontera?',
			  text: BodyJson["pais"] + " Tiene Una Frontera Con " + Frontera,
			  icon: 'question',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Eliminar'
			}).then((result) => {
			  if (result.isConfirmed) {
				return "si";
			  }
			  else {				  
				return "no";				  
			  }
			});

			if(Value == "si") {
				
				// Llamar AL Servicio 
				this.proyecto2Service.DeleteFrontera(BodyJson["id"]).subscribe(				
				
					// Resultado 
					Result => {
						
						if(Result) {
							
							// Mesanje
							Swal.fire({

							  icon: 'success',
							  text: "Frontera Eliminado Con Exito!",
							  showConfirmButton: false,
							  timer: 3000
							});
							
							// Valor		
							this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
							
						}	
						else 
						{
							
							// Mesanje
							Swal.fire({

							  icon: 'error',
							  text: "Error Al Eliminar La Frontera",
							  showConfirmButton: false,
							  timer: 3000
							});
							
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
		else if(localStorage.getItem("consulta") == "preguntas") {
			
			// Obtener Cuerpo
			// Obtener Cuerpo
			let BodyJson = this.datos[Codigo];
			
			// Cambiar Region 			 
			const Value = await Swal.fire({
			  title: 'Esta Seguro Que Desea Eliminar La Pregunta?',
			  text: BodyJson["pregunta"],
			  icon: 'question',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Eliminar'
			}).then((result) => {
			  if (result.isConfirmed) {
				return "si";
			  }
			  else {				  
				return "no";				  
			  }
			});

			if(Value == "si") {
				console.log(BodyJson);
				// Llamar AL Servicio 
				this.proyecto2Service.DeletePregunta(BodyJson["id"].trim(' ')).subscribe(				
				
					// Resultado 
					Result => {
						
						if(Result) {
							
							// Mesanje
							Swal.fire({

							  icon: 'success',
							  text: "Pregunta Eliminada Con Exito!",
							  showConfirmButton: false,
							  timer: 3000
							});
							
							// Valor		
							this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate(['/manager']));
							
						}	
						else 
						{
							
							// Mesanje
							Swal.fire({

							  icon: 'error',
							  text: "Error Al Eliminar La Pregunta",
							  showConfirmButton: false,
							  timer: 3000
							});
							
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
		
	}

}