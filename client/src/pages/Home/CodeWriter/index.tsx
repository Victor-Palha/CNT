import { useState, useEffect } from "react";

const ex = `#include <stdio.h>
#include <stdlib.h>
#include <libssh/libssh.h>

int main() {
\tssh_session my_ssh_session;
\tint verbosity = SSH_LOG_PROTOCOL;

\tmy_ssh_session = ssh_new();
\tif (my_ssh_session == NULL) {
\t\tfprintf(stderr, "Falha ao criar a sessão SSH.");
\t\texit(EXIT_FAILURE);
\t}

\tssh_options_set(my_ssh_session, SSH_OPTIONS_HOST, "seu_servidor_ssh.com");
\tssh_options_set(my_ssh_session, SSH_OPTIONS_USER, "seu_usuario");
\tssh_options_set(my_ssh_session, SSH_OPTIONS_LOG_VERBOSITY, &verbosity);

\tif (ssh_connect(my_ssh_session) != SSH_OK) {
\t\tfprintf(stderr, "Falha ao conectar ao servidor SSH.");
\t\texit(EXIT_FAILURE);
\t}

\tif (ssh_userauth_password(my_ssh_session, NULL, "sua_senha") != SSH_AUTH_SUCCESS) {
\t\tfprintf(stderr, "Falha na autenticação.");
\t\texit(EXIT_FAILURE);
\t}

\tssh_disconnect(my_ssh_session);
\tssh_free(my_ssh_session);

\treturn 0;
}
`;

export function CodeWriter() {
  const text = ex;
  const [code, setCode] = useState("");

  function writeCode(text: string, c = 0) {
    if (c < text.length) {
      setCode(text.slice(0, c + 1));

      setTimeout(() => {
        writeCode(text, c + 1);
      }, 35);
    }
  }

  useEffect(() => {
    writeCode(text);
  }, []);

  return (
      <code
        className="text-[14px] code-block cyber-glitch-2 opacity-80"
        data-title="CNT"
        style={{ whiteSpace: "pre-line" }}
      >
        {code}
      </code>
  );
}
