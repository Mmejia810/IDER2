package xyz.app.ider.dto;

import java.util.List;

public class RespuestaDTO {
    private int id;
    private String respuesta;
    private int usuarioId;
    private String usuarioNombre;
    private String usuarioEmail;
    private int seccionId;
    private String seccionTitulo;
    private int preguntaId;
    private String preguntaTexto;
    private String preguntaTipo;
    private List<OpcionDTO> opciones;

    public RespuestaDTO(int id, String respuesta, int usuarioId, String usuarioNombre, String usuarioEmail,
                        int seccionId, String seccionTitulo, int preguntaId, String preguntaTexto, String preguntaTipo,
                        List<OpcionDTO> opciones) {
        this.id = id;
        this.respuesta = respuesta;
        this.usuarioId = usuarioId;
        this.usuarioNombre = usuarioNombre;
        this.usuarioEmail = usuarioEmail;
        this.seccionId = seccionId;
        this.seccionTitulo = seccionTitulo;
        this.preguntaId = preguntaId;
        this.preguntaTexto = preguntaTexto;
        this.preguntaTipo = preguntaTipo;
        this.opciones = opciones;
    }

    // Getters y setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getRespuesta() { return respuesta; }
    public void setRespuesta(String respuesta) { this.respuesta = respuesta; }

    public int getUsuarioId() { return usuarioId; }
    public void setUsuarioId(int usuarioId) { this.usuarioId = usuarioId; }

    public String getUsuarioNombre() { return usuarioNombre; }
    public void setUsuarioNombre(String usuarioNombre) { this.usuarioNombre = usuarioNombre; }

    public String getUsuarioEmail() { return usuarioEmail; }
    public void setUsuarioEmail(String usuarioEmail) { this.usuarioEmail = usuarioEmail; }

    public int getSeccionId() { return seccionId; }
    public void setSeccionId(int seccionId) { this.seccionId = seccionId; }

    public String getSeccionTitulo() { return seccionTitulo; }
    public void setSeccionTitulo(String seccionTitulo) { this.seccionTitulo = seccionTitulo; }

    public int getPreguntaId() { return preguntaId; }
    public void setPreguntaId(int preguntaId) { this.preguntaId = preguntaId; }

    public String getPreguntaTexto() { return preguntaTexto; }
    public void setPreguntaTexto(String preguntaTexto) { this.preguntaTexto = preguntaTexto; }

    public String getPreguntaTipo() { return preguntaTipo; }
    public void setPreguntaTipo(String preguntaTipo) { this.preguntaTipo = preguntaTipo; }

    public List<OpcionDTO> getOpciones() { return opciones; }
    public void setOpciones(List<OpcionDTO> opciones) { this.opciones = opciones; }

    // Clase interna OpcionDTO para opciones de respuesta
    public static class OpcionDTO {
        private int id;
        private String texto;
        private String tipo;

        public OpcionDTO(int id, String texto, String tipo) {
            this.id = id;
            this.texto = texto;
            this.tipo = tipo;
        }

        // Getters y setters
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }

        public String getTexto() { return texto; }
        public void setTexto(String texto) { this.texto = texto; }

        public String getTipo() { return tipo; }
        public void setTipo(String tipo) { this.tipo = tipo; }
    }
}
