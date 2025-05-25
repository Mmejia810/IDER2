package xyz.app.ider.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class Usuario {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    @Column(nullable = false, length = 20)
	    private String identificacion;

	    @Column(nullable = false, length = 50)
	    private String nombre;

	    @Column(nullable = false, length = 50)
	    private String apellido;

	    @Column(name = "fechaCreacion", nullable = false)
	    @CreationTimestamp
	    private Date fechaCreacion;

	    @Column(nullable = false, length = 20)
	    private String estado;

	    @Column(nullable = false, length = 100)
	    private String email;

	    @Column(nullable = false, length = 100)
	    private String pass;

	    @ManyToOne
	    @JoinColumn(name = "id_rol", referencedColumnName = "id_rol")
	    private Roles rol;

		public Usuario() {
			super();
		}

		public Usuario(int id, String identificacion, String nombre, String apellido, Date fechaCreacion, String estado,
				String email, String pass, Roles rol) {
			super();
			this.id = id;
			this.identificacion = identificacion;
			this.nombre = nombre;
			this.apellido = apellido;
			this.fechaCreacion = fechaCreacion;
			this.estado = estado;
			this.email = email;
			this.pass = pass;
			this.rol = rol;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getIdentificacion() {
			return identificacion;
		}

		public void setIdentificacion(String identificacion) {
			this.identificacion = identificacion;
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getApellido() {
			return apellido;
		}

		public void setApellido(String apellido) {
			this.apellido = apellido;
		}

		public Date getFechaCreacion() {
			return fechaCreacion;
		}

		public void setFechaCreacion(Date fechaCreacion) {
			this.fechaCreacion = fechaCreacion;
		}

		public String getEstado() {
			return estado;
		}

		public void setEstado(String estado) {
			this.estado = estado;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPass() {
			return pass;
		}

		public void setPass(String pass) {
			this.pass = pass;
		}

		public Roles getRol() {
			return rol;
		}

		public void setRol(Roles rol) {
			this.rol = rol;
		}
	
}
