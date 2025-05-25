package xyz.app.ider.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;


@Entity
@Table(name = "Encuesta")
public class Encuesta {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "fecha_Creacion", nullable = false)
    @CreationTimestamp
    private Date fechaCreacion;

    @Column(name = "fecha_Cierre")
    private Date fechaCierre;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column
    private String descripcion;

    @Column(length = 20)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

	public Encuesta() {
		super();
	}

	public Encuesta(int id, Date fechaCreacion, Date fechaCierre, String titulo, String descripcion, String estado,
			Usuario usuario) {
		super();
		this.id = id;
		this.fechaCreacion = fechaCreacion;
		this.fechaCierre = fechaCierre;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.estado = estado;
		this.usuario = usuario;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaCierre() {
		return fechaCierre;
	}

	public void setFechaCierre(Date fechaCierre) {
		this.fechaCierre = fechaCierre;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
    
}
