package xyz.app.ider.dto;

import java.util.List;

public class OpcionDTO {
    private int id;
    private int preguntaId;
    private String texto;
    private String tipo;
    private boolean seleccionable;

    private int respuestaId;
    private String respuestaTexto;
    private int usuarioId;
    private int seccionEncuestaId;
    private int preguntaRespuestaId;

    private List<OpcionDTO> opcionesSeleccionadas;

    // Getters y setters

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getPreguntaId() {
        return preguntaId;
    }
    public void setPreguntaId(int preguntaId) {
        this.preguntaId = preguntaId;
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

    public boolean isSeleccionable() {
        return seleccionable;
    }
    public void setSeleccionable(boolean seleccionable) {
        this.seleccionable = seleccionable;
    }

    public int getRespuestaId() {
        return respuestaId;
    }
    public void setRespuestaId(int respuestaId) {
        this.respuestaId = respuestaId;
    }

    public String getRespuestaTexto() {
        return respuestaTexto;
    }
    public void setRespuestaTexto(String respuestaTexto) {
        this.respuestaTexto = respuestaTexto;
    }

    public int getUsuarioId() {
        return usuarioId;
    }
    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getSeccionEncuestaId() {
        return seccionEncuestaId;
    }
    public void setSeccionEncuestaId(int seccionEncuestaId) {
        this.seccionEncuestaId = seccionEncuestaId;
    }

    public int getPreguntaRespuestaId() {
        return preguntaRespuestaId;
    }
    public void setPreguntaRespuestaId(int preguntaRespuestaId) {
        this.preguntaRespuestaId = preguntaRespuestaId;
    }

    public List<OpcionDTO> getOpcionesSeleccionadas() {
        return opcionesSeleccionadas;
    }
    public void setOpcionesSeleccionadas(List<OpcionDTO> opcionesSeleccionadas) {
        this.opcionesSeleccionadas = opcionesSeleccionadas;
    }
}
