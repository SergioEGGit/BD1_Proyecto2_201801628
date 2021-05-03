// imports 
const poolconnection = require("./../data/config.js");


// consultas 
const router = app => {
	
	// mensaje de bienvenida
	app.get("/", (request, response) => {
		
		// retornar respuesta 
		response.send("servidor escuchando en puerto 9998!");
		
	});	
	
	// consulta no.1
	app.get("/proyecto2/consulta1", (request, response) => {
		
		// query 
		let query = "set sql_mode = (SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY,','')); select profesional.nombre_pr as profesional, count(invento.nombre_in) as numero_inventos from asigna_invento " +
					"left join profesional on id_pr = id_pr_ai " +
					"left join invento on id_in = id_in_ai " +
					"group by profesional.nombre_pr " +
					"order by numero_inventos desc;";
		
		// peticion de query 
		poolconnection.query({multipleStatements: true, sql: query}, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.2
	app.get("/proyecto2/consulta2", (request, response) => {
		
		// query 
		let query = "select (select nombre_re from region where id_re = sub1.continente) as continente, sub1.pais, sub1.numero_de_preguntas from ( " +
					" " +
					"	select if(isnull(region.id_re_re) = 1, region.id_re, region.id_re_re) as continente, nombre_pa as pais, count(id_rs_dpr) as numero_de_preguntas from pais " +
					"	left join region on id_re = id_re_pa " +
					"	left join detalle_pais_respuesta on id_pa_dpr = id_pa " +
					"	group by pais.nombre_pa " +
					" " + 
					") as sub1 " +
					"order by sub1.numero_de_preguntas desc;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.3
	app.get("/proyecto2/consulta3", (request, response) => {
		
		// query 
		let query = "select nombre_pa as pais, area_pa as area from pais " +
					"left join inventor on id_pa_iv = id_pa " +
					"left join frontera on id_pa_1_fr = id_pa " +
					"where isnull(id_iv) = 1 and isnull(id_pa_2_fr) = 1 and nombre_pa != \"nueva zelandia\" " +
					"group by pais.nombre_pa " +
					"order by area_pa desc;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.4
	app.get("/proyecto2/consulta4", (request, response) => {
		
		// query 
		let query = "select nombre_pr as jefe, inventor.nombre_iv as \"sub-alterno\" from profesional " +
					"left join asigna_invento on id_pr_ai = id_pr " +
					"left join invento on id_in = asigna_invento.id_in_ai " +
					"left join inventado on id_in_it = invento.id_in " +
					"left join inventor on id_iv = id_iv_it " +
					"group by nombre_pr, inventor.nombre_iv " +
					"order by nombre_pr asc;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.5
	app.get("/proyecto2/consulta5", (request, response) => {
		
		// query 
		let query = "select * from ( " +
					"  " +
					"	select profesional.nombre_pr as profesional, area_final.nombre_ar as area, profesional.salario_pr as salario, round(( " +
					" " +
					"		select sum(profesional.salario_pr) as numero_de_profesionales from detalle_area_profesional " +
					"		left join profesional on id_pr = id_pr_dap " +
					"		left join area on id_ar = id_ar_dap " +
					"		where area.nombre_ar = area_final.nombre_ar " +
					"		group by area.nombre_ar " +
					" " +
					"	) / ( " +
					" " +
					"		select count(profesional.salario_pr) as numero_de_profesionales from detalle_area_profesional " +
					"		left join profesional on id_pr = id_pr_dap " +
					"		left join area on id_ar = id_ar_dap " +
					"		where area.nombre_ar = area_final.nombre_ar " +
					"		group by area.nombre_ar " +
					" " +
					"	), 2) as salario_promedio from detalle_area_profesional " +
					"	left join profesional on id_pr = id_pr_dap " +
					"	left join area as area_final on id_ar = id_ar_dap " +
					"	group by area_final.nombre_ar, profesional.nombre_pr " +
					"	order by area_final.nombre_ar " +
					" " +
					") as sub1 " +
					"where sub1.salario > sub1.salario_promedio " +
					"order by sub1.profesional;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.6
	app.get("/proyecto2/consulta6", (request, response) => {
		
		// query 
		let query = "select * from ( " +
					" " +
					"	select pais.nombre_pa as pais, count(id_rs) as numero_de_respuestas_correctas from detalle_pais_respuesta " +
					"	left join pais on id_pa = id_pa_dpr " +
					"	left join respuesta on id_rs = id_rs_dpr " +
					"	left join respuesta_correcta on id_rs_rc " +
					"	where respuesta.id_rs = respuesta_correcta.id_rs_rc " +
					"	group by pais.id_pa, respuesta.id_rs " +
					" " +
					") as sub1  " +
					"order by sub1.numero_de_respuestas_correctas desc, sub1.pais asc; ";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.7
	app.get("/proyecto2/consulta7", (request, response) => {
		
		// query 
		let query = "select profesional.nombre_pr as profesional, invento.nombre_in as invento from invento " +
					"left join asigna_invento on id_in_ai = id_in " +
					"left join profesional on id_pr = asigna_invento.id_pr_ai " +
					"left join detalle_area_profesional on id_pr_dap = profesional.id_pr " +
					"left join area on id_ar = detalle_area_profesional.id_ar_dap " +
					"where area.nombre_ar = \"optica\" " +
					"group by profesional.nombre_pr, nombre_in, area.nombre_ar " +
					"order by profesional.nombre_pr;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.8
	app.get("/proyecto2/consulta8", (request, response) => {
		
		// query 
		let query = "select sub1.inicial_pais, sum(sub1.area) as area_total from ( " +
					" " +
					"	select substring(nombre_pa, 1, 1) as inicial_pais, area_pa as area from pais " +
					" " +
					") as sub1 " +
					"group by sub1.inicial_pais " +
					"order by sub1.inicial_pais;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.9
	app.get("/proyecto2/consulta9", (request, response) => {
		
		// query 
		let query = "select sub1.inventor, sub1.invento from ( " +
					" " +
					"	select inventor.nombre_iv as inventor, invento.nombre_in as invento, substring(inventor.nombre_iv, 1, 2) as iniciales from inventado " +
					"	left join inventor on id_iv = id_iv_it " +
					"	left join invento on id_in = id_in_it " +
					" " +
					") as sub1 " +
					"where sub1.iniciales = \"be\";";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.10
	app.get("/proyecto2/consulta10", (request, response) => {
		
		// query 
		let query = "select inventor.nombre_iv as inventor, invento.nombre_in as invento, invento.anio_in as año_invencion from inventado " +
					"left join inventor on id_iv = id_iv_it " +
					"left join invento on id_in = id_in_it " +
					"where (inventor.nombre_iv like \"b%r\" or inventor.nombre_iv like \"b%n\") and invento.anio_in between 1801 and 1900 " +
					"order by invento.anio_in asc;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.11
	app.get("/proyecto2/consulta11", (request, response) => {
		
		// query 
		let query = "select * from ( " +
					" " +
					"	select nombre_pa as pais, count(frontera.id_pa_2_fr) as numero_de_fronteras, sum(area_pa) as area_total from pais " +
					"	left join frontera on id_pa_1_fr = id_pa " +
					"	group by nombre_pa " +
					" " +
					") as sub1 " +
					"where sub1.numero_de_fronteras > 7 " +
					"order by sub1.area_total desc;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.12
	app.get("/proyecto2/consulta12", (request, response) => {
		
		// query 
		let query = "select nombre_in from invento " +
					"where substring(nombre_in, 1, 1) = \"l\" and length(nombre_in) = 4";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.13
	app.get("/proyecto2/consulta13", (request, response) => {
		
		// query 
		let query = "select * from ( " +
					" " +
					"	select nombre_pr as profesional, salario_pr as salario, comision_pr as comision, sum(salario_pr + comision_pr) as salario_total from profesional " +
					"	group by nombre_pr " +
					"	 " +
					") as sub1 " +
					"where sub1.comision > (select salario_pr * 0.25 as porcentaje_salario from profesional where nombre_pr = sub1.profesional);";    

							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.14
	app.get("/proyecto2/consulta14", (request, response) => {
		
		// query 
		let query = "select sub1.nombre_en, sum(sub1.numero_de_preguntas) as numero_de_preguntas from ( " +
					" " +
					"	select nombre_en, count(pregunta.pregunta_pg) as numero_de_preguntas from encuesta " +
					"	left join pregunta on id_en = id_en_pg  " +
					"	left join respuesta on id_pg_rs = pregunta.id_pg  " +
					"	left join detalle_pais_respuesta on id_rs_dpr = id_rs " +
					"	left join pais on id_pa = id_pa_dpr " +
					"	group by pais.nombre_pa, pregunta.pregunta_pg  " +
					" " +
					") as sub1 " +
					"group by sub1.nombre_en;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.15
	app.get("/proyecto2/consulta15", (request, response) => {
		
		// query 
		let query = "select nombre_pa as pais, poblacion_pa as poblacion from pais " +
					"where poblacion_pa > ( " +
					" " +
					"	select sum(poblacion_pa) as total_poblacion from pais " +
					"	left join region on id_re = id_re_pa " +
					"	where region.nombre_re = \"centro america\" " +
					" " +
					") order by nombre_pa asc;";  

							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.16
	app.get("/proyecto2/consulta16", (request, response) => {
		
		// query 
		let query = "select nombre_pr as profesional, inventor.nombre_iv as inventor, area.nombre_ar as area from profesional " +
					"left join asigna_invento on id_pr_ai = id_pr " +
					"left join invento on id_in = id_in_ai " +
					"left join inventado on id_in_it = id_in " +
					"left join inventor on id_iv = id_iv_it " +
					"left join detalle_area_profesional on id_pr_dap = id_pr  " +
					"left join area on id_ar = id_ar_dap " +
					"where area.nombre_ar != ( " +
					" " +
					"	select area.nombre_ar from profesional " +
					"	left join asigna_invento on id_pr_ai = id_pr " +
					"	left join invento on id_in = id_in_ai " +
					"	left join inventado on id_in_it = id_in " +
					"	left join inventor on id_iv = id_iv_it " +
					"	left join detalle_area_profesional on id_pr_dap = id_pr  " +
					"	left join area on id_ar = id_ar_dap " +
					"	where inventor.nombre_iv = \"pasteur\" " +
					" " +
					") " +
					"group by nombre_pr, inventor.id_iv, area.nombre_ar;"; 

							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.17
	app.get("/proyecto2/consulta17", (request, response) => {
		
		// query 
		let query = "select invento.nombre_in as invento, invento.anio_in as año_inventado from inventado " +
					"left join invento on id_in = id_in_it " +
					"left join inventor on id_iv = id_iv_it " +
					"where invento.anio_in = ( " +
					" " +
					"	 " +
					"	select invento.anio_in from inventado " +
					"	left join invento on id_in = id_in_it " +
					"	left join inventor on id_iv = id_iv_it " +
					"	where inventor.nombre_iv = \"benz\" " +
					" " +
					");";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.18
	app.get("/proyecto2/consulta18", (request, response) => {
		
		// query 
		let query = "select nombre_pa as pais, poblacion_pa as numero_de_habitantes from pais " +
					"left join frontera on id_pa_1_fr = id_pa " +
					"where isnull(id_pa_2_fr) = 1 and area_pa >= ( " +
					"	 " +
					"	select area_pa from pais " +
					"	where nombre_pa = \"japon\" " +
					"	group by nombre_pa " +
					" " +
					") " +
					"group by nombre_pa;";

							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.19
	app.get("/proyecto2/consulta19", (request, response) => {
		
		// query 
		let query = "select * from ( " +
					" " +
					"	select pais.nombre_pa as pais, pais_frontera.nombre_pa as frontera from pais  " +
					"	left join frontera on id_pa_1_fr = id_pa " +
					"	left join pais as pais_frontera on pais_frontera.id_pa = id_pa_2_fr " +
					"	order by pais.nombre_pa asc " +
					" " +
					") as sub1 " +
					"where isnull(sub1.frontera) != 1;";  

							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// consulta no.20
	app.get("/proyecto2/consulta20", (request, response) => {
		
		// query 
		let query = "select * from ( " +
					" " +
					"	select nombre_pr as profesional, salario_pr as salario, comision_pr as comision, sum(salario_pr + comision_pr) as salario_total from profesional " +
					"	group by nombre_pr " +
					"	 " +
					") as sub1 " +
					"where sub1.salario_total > 2 * sub1.comision;";     

							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// paises 
	app.get("/proyecto2/paises", (request, response) => {
		
		// query 
		let query = "select id_pa as id, (select nombre_re from region where id_re = id_re_pa) as region, nombre_pa as pais, poblacion_pa as poblacion, area_pa as area, capital_pa as capital from pais;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
	
	// fronteras
	app.get("/proyecto2/fronteras", (request, response) => {
		
		// query 
		let query = "select id_fr as id, (select nombre_pa from pais where id_pa = id_pa_1_fr) as pais, (select nombre_pa from pais where id_pa = id_pa_2_fr)  as frontera, norte_fr as norte, sur_fr as sur, este_fr as este, oeste_fr as oeste from frontera;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
		
	// regiones
	app.get("/proyecto2/regiones", (request, response) => {
		
		// query 
		let query = "select nombre_re as region from region;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
		
	// region
	app.get("/proyecto2/regiones/:nombre", (request, response) => {
		
		// query 
		let query = "select id_re as id from region where nombre_re = \"" + request.params.nombre + "\";";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});
				
	// agregar pais
	app.post("/proyecto2/paises/agregar", (request, response) => {
		
		// query 
		let query = "insert into pais set ?";
		
		// peticion de query 
		poolconnection.query(query, request.body, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
				
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});
		
	// modificar pais
	app.put("/proyecto2/paises/modificar/:id", (request, response) => {
		
		// query 
		let query = "update pais set ? where id_pa = ?";
		
		// peticion de query 
		poolconnection.query(query, [request.body, request.params.id], (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
	
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});		
		
	// eliminar pais
	app.delete("/proyecto2/paises/eliminar/:id", (request, response) => {
		
		// query 
		let query = "delete from pais where id_pa = ?";
		
		// peticion de query 
		poolconnection.query(query, request.params.id, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
			
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});		
		
	// seleccionar nombres de paises 
	app.get("/proyecto2/paises/nombre", (request, response) => {
		
		// query 
		let query = "select nombre_pa as pais from pais;";
							
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});	
	
	// pais
	app.get("/proyecto2/paises/:nombre", (request, response) => {
		
		// query 
		let query = "select id_pa as id from pais where nombre_pa = \"" + request.params.nombre + "\";";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});				
	
	// agregar frontera
	app.post("/proyecto2/fronteras/agregar", (request, response) => {
		
		// query 
		let query = "insert into frontera set ?";
		
		// peticion de query 
		poolconnection.query(query, request.body, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
				
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});
		
	// modificar frontera
	app.put("/proyecto2/fronteras/modificar/:id", (request, response) => {
		
		// query 
		let query = "update frontera set ? where id_fr = ?";
		
		// peticion de query 
		poolconnection.query(query, [request.body, request.params.id], (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
	
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});		
		
	// eliminar frontera
	app.delete("/proyecto2/fronteras/eliminar/:id", (request, response) => {
		
		// query 
		let query = "delete from frontera where id_fr = ?";
		
		// peticion de query 
		poolconnection.query(query, request.params.id, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
			
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});			
	
	// preguntas
	app.get("/proyecto2/preguntas", (request, response) => {
		
		// query 
		let query = "select id_pg as id, (select nombre_en from encuesta where id_en = id_en_pg) as encuesta, pregunta_pg as pregunta from pregunta;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});				
	
	// encuesta
	app.get("/proyecto2/encuestas", (request, response) => {
		
		// query 
		let query = "select nombre_en as encuesta from encuesta;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});				
	
	// encuestas
	app.get("/proyecto2/encuestas/:nombre", (request, response) => {
		
		// query 
		let query = "select id_en as id from encuesta where nombre_en = \"" + request.params.nombre + "\";";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});				
	
	// agregar pregunta
	app.post("/proyecto2/preguntas/agregar", (request, response) => {
		
		// query 
		let query = "insert into pregunta set ?";
		
		// peticion de query 
		poolconnection.query(query, request.body, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
				
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});
		
	// modificar pregunta
	app.put("/proyecto2/preguntas/modificar/:id", (request, response) => {
		
		// query 
		let query = "update pregunta set ? where id_pg = ?";
		
		// peticion de query 
		poolconnection.query(query, [request.body, request.params.id], (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);

			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});		
		
	// eliminar frontera
	app.delete("/proyecto2/preguntas/eliminar/:id", (request, response) => {
		
		// query 
		let query = "delete from pregunta where id_pg = ?";
		
		// peticion de query 
		poolconnection.query(query, request.params.id, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);
			
			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});			
	
	// inventado
	app.get("/proyecto2/inventado", (request, response) => {
		
		// query 
		let query = "select id_it as id, (select nombre_in from invento where id_in = id_in_it) as invento, (select anio_in from invento where id_in = id_in_it) as año_invencion, (select nombre_iv from inventor where id_iv = id_iv_it) as inventor from inventado;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});			
	
	// inventos
	app.get("/proyecto2/inventos/:nombre", (request, response) => {
		
		// query 
		let query = "select * from invento where nombre_in = \"" + request.params.nombre + "\";";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});		
	
	// inventores 
	app.get("/proyecto2/inventores", (request, response) => {
		
		// query 
		let query = "select nombre_iv from inventor;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});			
	
	// inventores 
	app.get("/proyecto2/inventor/:nombre", (request, response) => {
		
		// query 
		let query = "select id_iv as id from inventor where nombre_iv = \"" + request.params.nombre + "\";";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});	
	
	// modificar invento
	app.put("/proyecto2/invento/modificar/:id", (request, response) => {
		
		// query 
		let query = "update invento set ? where id_in = ?";
		
		// peticion de query 
		poolconnection.query(query, [request.body, request.params.id], (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);

			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});		
		
	// modificar inventado
	app.put("/proyecto2/inventado/modificar/:id", (request, response) => {
		
		// query 
		let query = "update inventado set ? where id_it = ?";
		
		// peticion de query 
		poolconnection.query(query, [request.body, request.params.id], (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);

			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});				
		
	// obtener respuestas correcta 
	app.get("/proyecto2/correctas", (request, response) => {
		
		// query 
		let query = "select id_rc as id, id_pg_rc as id_pregunta, (select pregunta_pg from pregunta where id_pg = id_pg_rc) as pregunta, (select respuesta_rs from respuesta where id_rs = id_rs_rc) as respuesta from respuesta_correcta;";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});	
	
	// obtener respuestas correcta 
	app.get("/proyecto2/correctas/:nombre", (request, response) => {
		
		// veificar si tiene ¿
		let aux = request.params.nombre.includes("¿");
		
		let nombre = "";
		
		if(aux) {
			
			nombre = request.params.nombre + "?";	
			
		}
		else 
		{
			
			nombre = request.params.nombre;
			
		}
		
		// query 
		let query = "select respuesta_rs as respuesta from respuesta where id_pg_rs = (select id_pg from pregunta where pregunta_pg = \"" + nombre + "\");";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});		
	
	// respuesta id
	app.get("/proyecto2/respuesta/:id/:idres", (request, response) => {
		
		// query 
		let query = "select id_rs as id, respuesta as respuesta from (select id_rs, respuesta_rs as respuesta from respuesta where id_pg_rs = (select id_pg from pregunta where id_pg = " + request.params.id + " )) as sub1 where sub1.respuesta = \"" + request.params.idres + "\";";
		
		// peticion de query 
		poolconnection.query(query, (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(error);;
				
			}
			else 
			{
				
				// enviar resultado
				response.send(resultado);
				
			}
			
		});
		
	});	
	
	// modificar inventado
	app.put("/proyecto2/respuestacorrecta/modificar/:id", (request, response) => {
		
		// query 
		let query = "update respuesta_correcta set ? where id_rc = ?";
		
		// peticion de query 
		poolconnection.query(query, [request.body, request.params.id], (error, resultado) => {
			
			// verificar si hay error 
			if(error) {
				
				// retornar el error 
				response.send(false);

			}
			else 
			{
				
				// enviar resultado
				response.send(true);
				
			}
			
		});
		
	});			
	
}

// exportar modulo 
module.exports = router;