import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'seg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  public Usuario : string;
  public Pass : string;
  
  constructor(private r : Router) { }

  ngOnInit(): void {
	 
		localStorage.clear();
	  
  }

  mensaje(): void {
	  
	this.showOK("Se ha enviado una contraseña temporal a su correo registrado."); 
  
  }

  ingreso(): void {
    
	if(this.Usuario == "admin") 
	{
		
		if(this.Pass == "admin") 
		{
			
			this.showOK("Bienvenido Al Sistema!");			
			this.r.navigate(['/home']);	
			
		}		
		else 
		{
			
			this.showFail("La Contraseña Es Incorrecta!");
			
		}
		
	}
	else 
	{
		
		// Mensaje De Error 
		this.showFail("El Usuario No Existe En El Sistema!");
		
	}
	
  }
  
   public showOK(texto: string){
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: texto,
      showConfirmButton: false,
      timer: 3000
    })
  }

  public showFail(texto :string){
    Swal.fire({
      position: 'top',
      icon: 'error',
      text: texto,
      showConfirmButton: false,
      timer: 3000
    })
  }
  
}