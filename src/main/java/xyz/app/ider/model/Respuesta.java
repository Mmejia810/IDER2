package xyz.app.ider.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "Respuesta")
public class Respuesta {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String respuesta;

    @ManyToOne
    @JoinColumn(name = "id_Usuario", referencedColumnName = "id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_seccionencuesta", referencedColumnName = "id")
    private SeccionEncuesta seccionEncuesta;
    
    @ManyToOne
    @JoinColumn(name = "id_Pregunta", referencedColumnName = "id")
    private Pregunta pregunta;
    
    @ManyToMany
    @JoinTable(
        name = "respuesta_opciones",  
        joinColumns = @JoinColumn(name = "id_respuesta"),
        inverseJoinColumns = @JoinColumn(name = "id_opcion")
    )
    private List<Opciones> opciones;

	public Respuesta() {
		super();
	}

	public Respuesta(String respuesta, Usuario usuario, SeccionEncuesta seccionEncuesta, Pregunta pregunta,
			List<Opciones> opciones) {
		super();
		this.respuesta = respuesta;
		this.usuario = usuario;
		this.seccionEncuesta = seccionEncuesta;
		this.pregunta = pregunta;
		this.opciones = opciones;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRespuesta() {
		return respuesta;
	}

	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public SeccionEncuesta getSeccionEncuesta() {
		return seccionEncuesta;
	}

	public void setSeccionEncuesta(SeccionEncuesta seccionEncuesta) {
		this.seccionEncuesta = seccionEncuesta;
	}

	public Pregunta getPregunta() {
		return pregunta;
	}

	public void setPregunta(Pregunta pregunta) {
		this.pregunta = pregunta;
	}

	public List<Opciones> getOpciones() {
		return opciones;
	}

	public void setOpciones(List<Opciones> opciones) {
		this.opciones = opciones;
	} 
}
