package xyz.app.ider.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Pregunta")
public class Pregunta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private String texto;

	@Column(nullable = false, length = 20)
	private String tipo;

	@ManyToOne
	@JoinColumn(name = "id_seccionencuesta", referencedColumnName = "id")
	private SeccionEncuesta seccionEncuesta;

	public Pregunta() {
		super();
	}

	public Pregunta(int id, String texto, String tipo, SeccionEncuesta seccionEncuesta) {
		super();
		this.id = id;
		this.texto = texto;
		this.tipo = tipo;
		this.seccionEncuesta = seccionEncuesta;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public SeccionEncuesta getSeccionEncuesta() {
		return seccionEncuesta;
	}

	public void setSeccionEncuesta(SeccionEncuesta seccionEncuesta) {
		this.seccionEncuesta = seccionEncuesta;
	}
}
