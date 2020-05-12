package com.api.dto;

import java.util.Date;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.api.modelos.Instructor;
import com.api.modelos.Usuario;

public class SesionDTO {
	@Future(message = "La fecha debe ser en el futuro")
    private Date fecha;

	@NotEmpty(message = "Tipo de clase vacio")
	private String sesion;

    @NotEmpty(message = "Instructor vacio")
    private String instructor;

    private String id;
    
	public Date getFecha() { return fecha; }
	public void setFecha(Date fecha_hora) { this.fecha = fecha_hora; }

	public String getInstructor() { return instructor; }
	public void setInstructor(String instructor) { this.instructor = instructor; }

	public String getSesion() { return sesion; }
	public void setSesion(String sesion) { this.sesion = sesion; }

	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
}

