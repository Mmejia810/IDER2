package xyz.app.ider.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Roles")
public class Roles {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_rol;

    @Column(nullable = false, length = 50)
    private String nombre_rol;

    @Column(nullable = false)
    private String descripcion_rol;

	public Roles() {
		super();
	}

	public Roles(int id_rol, String nombre_rol, String descripcion_rol) {
		super();
		this.id_rol = id_rol;
		this.nombre_rol = nombre_rol;
		this.descripcion_rol = descripcion_rol;
	}

	public int getId_rol() {
		return id_rol;
	}

	public void setId_rol(int id_rol) {
		this.id_rol = id_rol;
	}

	public String getNombre_rol() {
		return nombre_rol;
	}

	public void setNombre_rol(String nombre_rol) {
		this.nombre_rol = nombre_rol;
	}

	public String getDescripcion_rol() {
		return descripcion_rol;
	}

	public void setDescripcion_rol(String descripcion_rol) {
		this.descripcion_rol = descripcion_rol;
	}
	
}
