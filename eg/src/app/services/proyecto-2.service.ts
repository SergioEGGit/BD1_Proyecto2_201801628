import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class Proyecto2Service {
	
	// Ruta Server 
	ConsultaURL = 'http://localhost:9998/proyecto2';
	
	// Consturctor 
	constructor(private clientHttp: HttpClient) { }
	
	// Consulta 1
	getConsulta(Consulta: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/${Consulta}`);
		
	}		
	
	// Get Region 
	getOneRegion(Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/regiones/${Nombre}`);	
		
	}
	
	// Get Pais 
	getOnePais(Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/paises/${Nombre}`);	
		
	}	
	
	// Get Encuesta
	getOneEncuesta(Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/encuestas/${Nombre}`);	
		
	}		
	
	// Get Invento
	getOneInvento(Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/inventos/${Nombre}`);	
		
	}		
	
	// Get Invento
	getOneInventor(Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/inventor/${Nombre}`);	
		
	}	
	
	// Get Invento
	getRespuestas(Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/correctas/${Nombre}`);	
		
	}		
	
	// Añadir Pais 
	AddPais(Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.post(`${this.ConsultaURL}/paises/agregar`, Body);
		
	}
	
	// Modificar Pais 
	PutPais(Id: string|number, Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.put(`${this.ConsultaURL}/paises/modificar/${Id}`, Body);
		
	}
	
	// Eliminar Pais 
	DeletePais(Id: string|number) {
		
		// Retornar Resultado
		return this.clientHttp.delete(`${this.ConsultaURL}/paises/eliminar/${Id}`);
		
	}
	
	// Añadir Frontera 
	AddFrontera(Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.post(`${this.ConsultaURL}/fronteras/agregar`, Body);
		
	}
	
	// Modificar Frontera
	PutFrontera(Id: string|number, Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.put(`${this.ConsultaURL}/fronteras/modificar/${Id}`, Body);
		
	}
	
	// Eliminar Frontera 
	DeleteFrontera(Id: string|number) {
		
		// Retornar Resultado
		return this.clientHttp.delete(`${this.ConsultaURL}/fronteras/eliminar/${Id}`);
		
	}
	
	// Añadir Pregunta
	AddPregunta(Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.post(`${this.ConsultaURL}/preguntas/agregar`, Body);
		
	}
	
	// Modificar Pregunta
	PutPregunta(Id: string|number, Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.put(`${this.ConsultaURL}/preguntas/modificar/${Id}`, Body);
		
	}
	
	// Eliminar Pregunta 
	DeletePregunta(Id: string|number) {
		
		// Retornar Resultado
		return this.clientHttp.delete(`${this.ConsultaURL}/preguntas/eliminar/${Id}`);
		
	}	
	
	// Modificar Invento
	PutInvento(Id: string|number, Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.put(`${this.ConsultaURL}/invento/modificar/${Id}`, Body);
		
	}
	
	// Modificar Invento
	PutInventado(Id: string|number, Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.put(`${this.ConsultaURL}/inventado/modificar/${Id}`, Body);
		
	}
	
	// Get Invento
	getIdRespuesta(IdPG: string|number, Nombre: string) {
		
		// Retornar Resultado
		return this.clientHttp.get(`${this.ConsultaURL}/respuesta/${IdPG}/${Nombre}`);	
		
	}		
	
	// Modificar Respueta 
	PutRespuestaCorrecta(Id: string|number, Body: any) {
		
		// Retornar Resultado
		return this.clientHttp.put(`${this.ConsultaURL}/respuestacorrecta/modificar/${Id}`, Body);
		
	}	
	
}