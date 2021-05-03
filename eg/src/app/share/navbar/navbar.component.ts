import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'seg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private r : Router) { }

  ngOnInit(): void {
  }

	redireccionar(url: string, Nombre: string) {
	  
		if(url == "/login")
		{
			
			this.showOK();
			this.r.navigate([url]);
		
		}	 
		else 
		{
			
			// Insertar En Storage
			localStorage.setItem("consulta", Nombre);			
			this.r.navigateByUrl('/Auxiliar', {skipLocationChange: true}).then(() => this.r.navigate([url]));
			
		}
	  
	}	
	
	 public showOK(){
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: "Gracias por utilizar la aplicación, Vuelva pronto!",
      showConfirmButton: false,
      timer: 3000
    })
  }

}
