"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Completá nombre, correo y mensaje.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Consulta Patente PBA - ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid max-w-xl gap-5" noValidate>
      <div className="grid gap-2">
        <label htmlFor="nombre" className="text-sm font-medium">
          Nombre
        </label>
        <input
          id="nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="field-input"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Correo
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field-input"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="mensaje" className="text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-[8px] border border-line bg-card px-3 py-3 text-[15px]"
        />
      </div>
      {error ? (
        <p className="text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="inline-flex h-11 w-fit items-center justify-center rounded-[8px] bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover active:scale-[0.98]"
      >
        Enviar mensaje
      </button>
      <p className="text-sm text-muted">
        Se abre tu cliente de correo hacia {CONTACT_EMAIL}. No guardamos el
        contenido del mensaje en este sitio.
      </p>
    </form>
  );
}
