package xyz.app.ider.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Opciones")
public class Opciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 20)
    private String tipo;

    @Column(nullable = false)
    private String texto;

    @Column(nullable = false)
    private boolean seleccionable;
    
    @ManyToOne
    @JoinColumn(name = "id_pregunta", referencedColumnName = "id")
    private Pregunta pregunta;



    // Constructores
    public Opciones() {}

    public Opciones(String tipo, String texto, boolean seleccionable, Pregunta pregunta) {
        this.tipo = tipo;
        this.texto = texto;
        this.seleccionable = seleccionable;
        this.pregunta = pregunta;
    }

    // Getters y setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public boolean isSeleccionable() {
        return seleccionable;
    }

    public void setSeleccionable(boolean seleccionable) {
        this.seleccionable = seleccionable;
    }

    public Pregunta getPregunta() {
        return pregunta;
    }

    public void setPregunta(Pregunta pregunta) {
        this.pregunta = pregunta;
    }
}
