import { useState, useEffect } from "react";

const ex = `// QuantumFlux Data Integration Protocol initialization
cyberVar quantumFluxStream
\t
// NeuroCortex Hyperthreading Mechanism activation
activateNeuroThread(NCHM)
\t
// SynthoKinetic Quantum Encryption Algorithm key generation
generateEncryptionKey(SKQEA)
\t
// CyberGenomic Quantum Biometrics scan
userIdentity = scanQuantumBiometrics(CGQB)
\t
// MegaQuark Quantum Neural Fabric activation
activateMegaQuarkFabric(MQQNF)
\t
// NanoChrono Quantum Entanglement Synchronization start
startQuantumEntanglementSynchronization(NCQES)
`;

export function CodeWriter() {
  const text = ex;
  const [code, setCode] = useState("");

  function writeCode(text: string, c = 0) {
    if (c < text.length) {
      setCode(text.slice(0, c + 1));

      setTimeout(() => {
        writeCode(text, c + 1);
      }, 40);
    }
  }

  useEffect(() => {
    writeCode(text);
  }, []);

  return (
      <code
        className="text-[16px] code-block cyber-glitch-2"
        data-title="CNT"
        style={{ whiteSpace: "pre-line" }}
      >
        {code}
      </code>
  );
}
