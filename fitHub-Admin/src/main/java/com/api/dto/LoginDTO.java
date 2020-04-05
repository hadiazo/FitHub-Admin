package com.api.dto;

import com.mongodb.lang.NonNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class LoginDTO {
    @NonNull
    @NotEmpty
    @Email
    private String correo;

    @NonNull
    @NotEmpty
    private String contrasena;


    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }



}
